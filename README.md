# Frontend Technical Assessment: Dynamic Stepper Component

## StepperApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.
This project is a functional, full-screen dynamic stepper component built for an Angular application, as per the provided assessment requirements. It is designed to be highly reusable and configurable, with robust client-side validation and dynamic content injection.

---

![Scenarios page](./homepage.PNG)

## 1. How to Set Up and Run the Application

To set up and run this project, follow these steps:

1.  **Install dependencies:** Ensure you have Node.js and the Angular CLI installed. Then, run the following command to install the project dependencies:

    ```bash
    npm install
    ```

2.  **Run the application:** Start the development server with the following command:
    ```bash
    ng serve
    ```
3.  Navigate to `http://localhost:4200/` in your web browser to view the application.

---

## 2. Design Choices

### Modularity and Reusability

The stepper is designed as a standalone component to be easily dropped into any part of a larger enterprise application. The architecture ensures a clear separation of concerns:

- **Main Stepper Component**: Manages the navigation state, step validity, and data flow.
- **Step Components**: Each individual step (e.g., `EnpsSettingsComponent`, `ImpactDriversComponent`) is a self-contained component responsible for its own UI and form logic.
- **Services**: Data management and communication between components would be handled by a dedicated service, though this is not fully implemented in the provided examples.

### Configurability

The stepper is highly configurable to adapt to different workflows. This is achieved by:

- **Dynamic Content Injection**: The stepper component does not hardcode its content. Instead, it programmatically accepts an array of step objects, each defining the content (a component or template) and associated data.
- **Data Handling**: The stepper component can be initialized with data from a parent component and will emit all consolidated data upon successful completion. This makes it suitable for various multi-step data collection workflows.

### Design Patterns

- **Observer Pattern**: This is leveraged implicitly through Angular's reactive forms and RxJS observables. The `valueChanges` observable on form groups is subscribed to in the component, allowing it to reactively update calculated values and form validity.
- **Strategy Pattern**: The different form components (`EnpsSettingsComponent`, `ImpactDriversComponent`, etc.) can be seen as different "strategies" for a step's content. The main stepper component can render any of these strategies based on the provided configuration.
