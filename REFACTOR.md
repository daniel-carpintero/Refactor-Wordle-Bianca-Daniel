# Documentación de Refactorización — Wordle - ES

## ¿Qué se refactorizó y por qué?

1. Contexto inicial del proyecto
El proyecto partía de una implementación monolítica donde la clase Game concentraba la mayoría de responsabilidades: gestión del estado, validación de entradas, manipulación del DOM, evaluación de palabras y control de navegación. Este acoplamiento hacía difícil extender o testear el código.

2. Refactorización hacia una arquitectura modular
La refactorización reorganizó el proyecto en una estructura más clara y separada por capas, distribuyendo responsabilidades en módulos independientes:

domain/ contiene la lógica central del juego:
Game gestiona el estado interno.
WordEvaluator evalúa las palabras.
Word, GameStatus y otros modelos encapsulan conceptos del dominio.

application/ contiene la capa de orquestación:
GameController coordina las acciones del usuario y el flujo del juego.
GameFactory centraliza la creación de instancias necesarias.

infrastructure/ agrupa implementaciones concretas dependientes del entorno:
KeyboardInput gestiona la entrada del teclado.
Interface manipula el DOM.
NavigationHandler controla la navegación entre pantallas.

interfaces/ define las abstracciones que permiten desacoplar módulos:
Interfaces como IWordEvaluator, IKeyboardInput, IInterface o INavigationHandler permiten sustituir implementaciones sin modificar la lógica del juego.
config/ contiene la configuración global (env.ts).
Esta organización mejora la legibilidad y facilita el mantenimiento, ya que cada módulo tiene una responsabilidad clara.

3. Cambios aplicados en el diseño
El código actual refleja varios de los objetivos de la refactorización:

Separación de responsabilidades entre dominio, infraestructura y aplicación.
Uso de interfaces para desacoplar dependencias.
GameController como punto central de coordinación.
WordEvaluator, KeyboardInput y Interface como componentes especializados.
Aunque la arquitectura no implementa todos los detalles del diseño ideal, sí establece una base modular sólida.

4. Mejoras funcionales implementadas
Durante la refactorización se corrigieron problemas detectados en la versión original:

El algoritmo de evaluación de letras se ajustó para manejar correctamente letras duplicadas.
El estado del teclado se actualiza respetando la prioridad de colores, evitando degradaciones.
Se unificó el diseño visual de las pantallas de victoria y derrota mediante un nuevo archivo winLose.css.

5. Estado actual del proyecto
El proyecto ahora cuenta con una estructura modular clara y escalable. Aunque algunos aspectos del diseño ideal (como la inyección de dependencias estricta o la eliminación total de dependencias implícitas) pueden no estar implementados al 100%, la arquitectura actual representa una mejora significativa respecto al enfoque monolítico original.

# Refactoring Documentation — Wordle - ENG

## What was refactored and why?

1. Initial state of the project
The project originally followed a monolithic design in which the Game class acted as a God Object. It handled game state, DOM manipulation, keyboard validation, word evaluation, and navigation logic all in one place. This tight coupling made the code difficult to maintain, extend, and test.

2. Transition to a modular architecture
The refactoring reorganized the project into a clearer, layered structure, distributing responsibilities across independent modules:

domain/ contains the core game logic:
Game manages the internal state.
WordEvaluator compares the user’s input with the target word.
Supporting models such as Word and GameStatus encapsulate domain concepts.

application/ contains orchestration logic:
GameController coordinates user actions and game flow.
GameFactory centralizes the creation of required components.

infrastructure/ contains environment‑dependent implementations:
KeyboardInput handles keyboard events and input validation.
Interface manages all DOM interactions.
NavigationHandler controls transitions between screens.

interfaces/ defines abstractions that decouple modules:
Interfaces such as IWordEvaluator, IKeyboardInput, IInterface, and INavigationHandler allow swapping implementations without modifying game logic.
config/ stores global configuration (env.ts).
This structure improves readability and maintainability by ensuring each module has a single, well‑defined responsibility.

3. Design improvements reflected in the current code
The current implementation incorporates several of the intended architectural goals:

Clear separation between domain logic, infrastructure, and application orchestration.
Use of interfaces to reduce coupling between components.
GameController acting as the central coordinator.
Specialized classes for evaluation, input handling, and UI updates.
While not every aspect of the ideal design is implemented, the project now follows a much more modular and scalable structure than the original monolithic version.

4. Functional fixes and enhancements
During the refactor, several issues from the original implementation were addressed:

The letter‑evaluation algorithm was corrected to properly handle duplicate letters.
Keyboard state updates now respect color priority, preventing valid green or orange states from being overwritten.
The win and lose screens were visually unified using a shared winLose.css file.

5. Current state of the project
The project now has a solid modular foundation. Even if some advanced design goals (such as strict dependency injection or fully isolated configuration) are not fully implemented, the current architecture represents a significant improvement in clarity, testability, and maintainability compared to the original version.