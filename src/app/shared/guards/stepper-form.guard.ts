import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { HelpersService } from '../services/helpers.service';

export const stepperFormGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const stepperState = inject(HelpersService);
    const formGroupName = route.data['formGroupName'];
    if (stepperState.mainForm.get(formGroupName)?.valid) {
        return true;
    } else {
        // Optionally: Show alert or dialog here
        alert('Please complete the form before proceeding.');
        return false; // Cancel navigation
    }
};