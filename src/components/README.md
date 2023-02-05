Components
----------
These are the frontend building blocks. Pages should be composed of Components.

The file structure should look as follows:
- components | **root folder for components**
  - AppBar | **Each component should have its own folder, named the same name as the component name**
    - AppBar.tsx | **The file that contains the code for the component**
    - index.ts | **A barrel file that exports the public members of the Component (interfaces and UI code, not tests or stories)**
    - AppBar.test.tsx | **A jest test file**