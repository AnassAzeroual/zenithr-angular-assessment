import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Scenario {
  id?: number;
  name: string;
  respondents: number;
  scoreRange: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScenariosService {

  private scenarios: Scenario[] = [
    { id: 1, name: 'Scenario A', respondents: 500, scoreRange: '0 - 100' },
    { id: 2, name: 'Scenario B', respondents: 400, scoreRange: '10 - 90' },
    { id: 3, name: 'Scenario C', respondents: 400, scoreRange: '10 - 90' },
  ];

  constructor() { }

  /**
   * Get all scenarios with simulated network delay
   * @returns Observable<Scenario[]> - List of scenarios after 500ms delay
   */
  getScenarios(): Observable<Scenario[]> {
    // Simulate network delay of 500ms
    return of(this.scenarios).pipe(
      delay(500)
    );
  }

  /**
   * Get scenario by ID with simulated network delay
   * @param id - Scenario ID
   * @returns Observable<Scenario | undefined>
   */
  getScenarioById(id: number): Observable<Scenario | undefined> {
    const scenario = this.scenarios.find(s => s.id === id);
    return of(scenario).pipe(
      delay(500)
    );
  }

  /**
   * Add new scenario with simulated network delay
   * @param scenario - Scenario to add
   * @returns Observable<Scenario>
   */
  addScenario(scenario: Omit<Scenario, 'id'>): Observable<Scenario> {
    const newScenario: Scenario = {
      ...scenario,
      id: Math.max(...this.scenarios.map(s => s.id || 0), 0) + 1
    };
    this.scenarios.push(newScenario);
    
    return of(newScenario).pipe(
      delay(500)
    );
  }

  /**
   * Update existing scenario with simulated network delay
   * @param id - Scenario ID
   * @param updates - Partial scenario updates
   * @returns Observable<Scenario | null>
   */
  updateScenario(id: number, updates: Partial<Scenario>): Observable<Scenario | null> {
    const index = this.scenarios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.scenarios[index] = { ...this.scenarios[index], ...updates };
      return of(this.scenarios[index]).pipe(
        delay(500)
      );
    }
    return of(null).pipe(
      delay(500)
    );
  }

  /**
   * Delete scenario with simulated network delay
   * @param id - Scenario ID
   * @returns Observable<boolean>
   */
  deleteScenario(id: number): Observable<boolean> {
    const index = this.scenarios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.scenarios.splice(index, 1);
      return of(true).pipe(
        delay(500)
      );
    }
    return of(false).pipe(
      delay(500)
    );
  }

  /**
   * Search scenarios by name with simulated network delay
   * @param searchTerm - Search term
   * @returns Observable<Scenario[]>
   */
  searchScenarios(searchTerm: string): Observable<Scenario[]> {
    const filtered = this.scenarios.filter(scenario =>
      scenario.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return of(filtered).pipe(
      delay(500)
    );
  }
}