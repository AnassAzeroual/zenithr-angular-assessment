import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScenariosService, Scenario } from './scenarios.service';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss'],
  imports: [RouterLink, CommonModule, ReactiveFormsModule]
})
export class ScenariosComponent implements OnInit, OnDestroy {
  private scenariosService = inject(ScenariosService);
  private destroy$ = new Subject<void>();
  
  // Search functionality
  searchControl = new FormControl('', { nonNullable: true });
  
  // Using signals for reactive state management
  private allScenarios = signal<Scenario[]>([]);
  private searchTerm = signal<string>('');
  
  // Computed signal for filtered scenarios
  scenarios = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    if (!search) {
      return this.allScenarios();
    }
    
    return this.allScenarios().filter(scenario =>
      scenario.name.toLowerCase().includes(search) ||
      scenario.respondents.toString().includes(search) ||
      scenario.scoreRange.toLowerCase().includes(search)
    );
  });
  
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Search state
  isSearching = computed(() => this.searchTerm().length > 0);
  searchResultsCount = computed(() => this.scenarios().length);

  ngOnInit() {
    this.setupSearch();
    this.loadScenarios();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* -------------------------------------------------------------------------- */
  /*                    Setup search functionality with RxJS                    */
  /* -------------------------------------------------------------------------- */
  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      startWith(''), // Start with empty string
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only emit if value changed
      takeUntil(this.destroy$) // Cleanup on component destroy
    ).subscribe(searchValue => {
      this.searchTerm.set(searchValue);
    });
  }

  /* -------------------------------------------------------------------------- */
  /*          Load scenarios from service with loading state management         */
  /* -------------------------------------------------------------------------- */
  private loadScenarios(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.scenariosService.getScenarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (scenarios) => {
          this.allScenarios.set(scenarios); // Store in allScenarios instead
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error loading scenarios:', err);
          this.error.set('Failed to load scenarios. Please try again.');
          this.isLoading.set(false);
        }
      });
  }


  /* -------------------------------------------------------------------------- */
  /*                            Public methods                                  */
  /* -------------------------------------------------------------------------- */
  
  /**
   * Refresh scenarios data
   */
  refreshScenarios(): void {
    this.loadScenarios();
  }

  /**
   * Clear search input and reset filter
   */
  clearSearch(): void {
    this.searchControl.setValue('');
  }

  /**
   * Get current search term for display
   */
  getCurrentSearchTerm(): string {
    return this.searchTerm();
  }

  /**
   * Check if there are any search results
   */
  hasSearchResults(): boolean {
    return this.isSearching() && this.searchResultsCount() > 0;
  }

  /**
   * Check if search returned no results
   */
  hasNoSearchResults(): boolean {
    return this.isSearching() && this.searchResultsCount() === 0;
  }

  /**
   * Highlight search terms in text
   */
  highlightSearchTerm(text: string): string {
    if (!this.isSearching() || !text) return text;
    
    const searchTerm = this.getCurrentSearchTerm();
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>');
  }

  /**
   * Track function for ngFor optimization
   */
  trackByScenario(index: number, scenario: Scenario): number {
    return scenario.id || index;
  }
}
