import { Routes } from '@angular/router';
import { stepperFormGuard } from './shared/guards/stepper-form.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./shared/layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'scenarios',
            },
            {
                path: 'scenarios',
                loadComponent: () =>
                    import('./pages/scenarios/scenarios.component').then((m) => m.ScenariosComponent),
            },
        ],
    },
    {
        path: 'survey',
        loadComponent: () => import('./shared/layouts/full-screen-layout/full-screen-layout.component')
            .then((m) => m.FullScreenLayoutComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'select-product',
            },
            {
                path: 'select-product',
                loadComponent: () =>
                    import('./pages/select-product/select-product.component').then((m) => m.SelectProductComponent),
            },
            {
                path: 'total-respondents',
                loadComponent: () =>
                    import('./pages/total-respondents/total-respondents.component').then((m) => m.TotalRespondentsComponent),
                canActivate: [stepperFormGuard],
                data: {
                    formGroupName: 'productDetailsForm'
                }
            },
            {
                path: 'select-criteria',
                loadComponent: () =>
                    import('./pages/select-criteria/select-criteria.component').then((m) => m.SelectCriteriaComponent),
                canActivate: [stepperFormGuard],
                data: {
                    formGroupName: 'respondentsForm'
                }
            },
            {
                path: 'set-impact-drivers',
                loadComponent: () =>
                    import('./pages/set-impact-drivers/set-impact-drivers.component').then((m) => m.SetImpactDriversComponent),
                canActivate: [stepperFormGuard],
                data: {
                    formGroupName: 'distributionForm'
                }
            },
            {
                path: 'enps',
                loadComponent: () =>
                    import('./pages/enps/enps.component').then((m) => m.EnpsComponent),
                canActivate: [stepperFormGuard],
                data: {
                    formGroupName: 'impactDriversForm'
                }
            },
            {
                path: 'comments',
                loadComponent: () =>
                    import('./pages/comments/comments.component').then((m) => m.CommentsComponent),
                canActivate: [stepperFormGuard],
                data: {
                    formGroupName: 'enpsForm'
                }
            }
        ],
    },
];
