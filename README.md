# 📝 Todo App with Professional Testing Setup

A modern **Todo application** built with  **React + TypeScript** , using **Zustand** for state management and a  **professional, layered testing strategy** .

This project is designed to demonstrate  **real-world frontend engineering practices** , especially  **testing architecture** , component design patterns, and clean separation of concerns.

---

## 🚀 Features

* Add, edit, complete, and delete tasks
* Input validation with error handling
* Accessible UI (aria attributes, focus management)
* Global state management using Zustand

---

## 🧱 Architecture

The project demonstrates **multiple architectural patterns** to reflect real-world engineering decision-making rather than a single rigid approach.

```
components/
├── pattern-container-presentational/
│   ├── task-form.tsx        # Container
│   ├── task-form-view.tsx   # Presentational (UI only)
│   ├── task-item.tsx
│   ├── task-list.tsx
│   └── use-form-task.ts     # Business logic hook
│
├── pattern-single-component/
│   ├── task-form.tsx        # Logic + UI together
│   ├── task-item.tsx
│   └── task-list.tsx
```

---

## 🧩 Architectural Patterns Demonstrated

This project **intentionally includes two different component architecture patterns** to demonstrate flexibility, trade-off awareness, and real-world frontend engineering judgment.

### 1️⃣ Single-Component Pattern

```
components/pattern-single-component/
```

* Logic and UI are colocated in the same file
* Minimal abstraction
* Easier to reason about for small components

**Used when:**

* Component logic is simple
* Rapid iteration is preferred
* Over-engineering would reduce clarity

---

### 2️⃣ Container / Presentational Pattern

```
components/pattern-container-presentational/
```

* Business logic extracted into custom hooks
* UI components receive data and callbacks via props only
* Clear separation of concerns

**Benefits:**

* Easier unit testing
* Better scalability
* Improved long-term maintainability

**Used when:**

* Component behavior is complex
* Logic needs to be tested in isolation
* Reusability and clarity are priorities

---

### 🧠 Design Decision

Both patterns coexist  **by design** , not by accident.

This reflects a real-world principle:

> **Architecture is a tool, not a rule.**

The chosen pattern depends on:

* Component complexity
* Testing requirements
* Maintainability vs simplicity trade-offs

---

## 🧪 Testing Strategy

This project uses a  **layered testing approach** , inspired by real production systems.

### 1️⃣ Unit Tests (UI Components)

* Test **presentational components only**
* Props-driven, no global state
* Focus on rendering and callbacks

Example:

* `TaskFormView`
* `TaskListView`

---

### 2️⃣ Hook Tests (Business Logic)

* Test custom hooks in isolation
* Zustand store is mocked
* Covers:
  * Initial state
  * State updates
  * Error handling
  * Side effects

Example:

* `useTaskForm`

---

### 3️⃣ Container Tests

* Containers are tested with **mocked hooks**
* Ensure correct wiring between logic and UI
* No duplicated logic tests

Example:

* `TaskForm`

---

### 4️⃣ Integration Tests (User Flow)

* Test full user scenarios
* Simulate real user interactions
* Validate UI + logic together

Examples:

* Add task flow
* Error → fix → submit flow
* Task list rendering from store

---

## 📂 Test Structure

```
__tests__/
├── unit/
│   ├── task-form-view.test.tsx
│   ├── task-item.test.tsx
│   └── task-list.test.tsx
│
├── hooks/
│   └── use-form-task.test.tsx
│
├── integration/
│   ├── task-form.integration.test.tsx
│   └── task-list.integration.test.tsx
```

---

## 🛠 Tech Stack

* **React**
* **TypeScript**
* **Zustand** (state management)
* **Jest** (test runner)
* **React Testing Library**
* **@testing-library/user-event**

---

## 🧠 Testing Principles Applied

* Test behavior, not implementation
* Avoid testing internal state
* Use `userEvent` instead of `fireEvent`
* Mock external dependencies (Zustand)
* Keep tests readable and intention-revealing

---

## ▶️ Running the Project

```bash
pnpm install
pnpm run dev
```

### Run tests

```bash
pnpm test
```

Run a specific test folder:

```bash
pnpm test hooks
pnpm test integration
```

---

## 👨‍💻 Author

**Frontend Engineer focused on clean architecture and testable React applications.**

This project demonstrates:

* Production-level testing mindset
* Scalable component patterns
* Professional code organization

---

## 📌 Notes for Reviewers

> This project intentionally includes **unit, hook, and integration tests** to demonstrate
> real-world testing strategies rather than minimal coverage.

---

⭐ If you are reviewing this repository as part of a hiring process, feel free to explore the test folders to see how each layer is validated independently.
