# Documentación de Refactorización — Wordle - ES

## ¿Qué se refactorizó y por qué?

El proyecto partía de un diseño monolítico donde la clase `Game` actuaba como un God Object: gestionaba el estado del juego, manipulaba el DOM, validaba el teclado, evaluaba letras y controlaba la navegación, todo en un mismo sitio. Cualquier cambio en una de estas partes afectaba inevitablemente a las demás, haciendo el código difícil de mantener y de testear.

La refactorización divide esas responsabilidades en clases independientes siguiendo los principios SOLID. `Game` pasa a ser un modelo puro que solo gestiona el estado. `WordEvaluator` se encarga exclusivamente de comparar la palabra introducida con la objetivo. `KeyboardInput` maneja la validación y transformación de teclas. `Interface` centraliza toda interacción con el DOM. `NavigationHandler` decide cuándo redirigir al jugador. Y `GameController` actúa como orquestador, recibiendo todas estas piezas por inyección de dependencias y coordinándolas sin contener lógica de negocio propia.

En una iteración posterior se añadieron dos mejoras adicionales orientadas al desacoplamiento. Por un lado, se extrajo la interfaz `IWordEvaluator` a su propio archivo, de modo que `Game` ya no depende de la clase concreta `WordEvaluator` sino de una abstracción; esto permite sustituir el evaluador por cualquier otra implementación sin tocar la lógica del juego. Por otro lado, `Game` dejó de importar las constantes globales de `env.ts` y empezó a recibirlas como parámetros de constructor (`maxWordSize` y `maxAttempts`), eliminando la dependencia implícita a un módulo externo y haciendo la clase completamente autocontenida y testeable de forma aislada.

Además se corrigieron dos bugs: el algoritmo de evaluación de letras fallaba con letras duplicadas, ya que usaba `RegExp` para contar ocurrencias sin marcar las letras ya consumidas; ahora usa un algoritmo de dos pasadas que lo resuelve correctamente. También se arregló el estado del teclado, que sobreescribía colores verdes o naranjas con gris al final de cada turno; ahora se respeta una prioridad de estados para que un color mejor nunca sea degradado.

Por último, se unificó el diseño visual de las páginas de victoria y derrota con un nuevo archivo `winLose.css` compartido, y se añadieron tres nuevas clases CSS al teclado para reflejar los mismos colores que las celdas de la cuadrícula.


# Refactoring Documentation — Wordle - ENG

## What was refactored and why?

The project originally followed a monolithic design where the `Game` class acted as a God Object: it managed game state, manipulated the DOM, validated keyboard input, evaluated letters, and controlled navigation, all in one place. Any change to one of these concerns would inevitably affect the others, making the codebase difficult to maintain and to test.

The refactoring splits those responsibilities into independent classes following SOLID principles. `Game` becomes a pure model that only manages state. `WordEvaluator` is solely responsible for comparing the submitted word against the target. `KeyboardInput` handles key validation and transformation. `Interface` centralises all DOM interaction. `NavigationHandler` decides when to redirect the player. And `GameController` acts as the orchestrator, receiving all of these pieces via dependency injection and coordinating them without containing any business logic of its own.

A subsequent iteration introduced two further improvements aimed at decoupling. First, the `IWordEvaluator` interface was extracted into its own file, so that `Game` no longer depends on the concrete `WordEvaluator` class but on an abstraction — allowing the evaluator to be swapped for any other implementation without touching the game logic. Second, `Game` stopped importing the global constants from `env.ts` and instead receives them as constructor parameters (`maxWordSize` and `maxAttempts`), removing the implicit dependency on an external module and making the class fully self-contained and testable in isolation.

Two bugs were also fixed. The letter evaluation algorithm was producing incorrect results with duplicate letters, as it used `RegExp` to count occurrences without tracking already-consumed letters; it now uses a two-pass algorithm that handles this correctly. The keyboard state logic was also corrected — it previously overwrote green or orange key colours with grey at the end of each turn; it now respects a state priority system so that a better colour is never downgraded.

Finally, the visual design of the win and loss pages was unified with a new shared `winLose.css` file, and three new CSS classes were added to the keyboard to mirror the same colour scheme used by the grid cells.