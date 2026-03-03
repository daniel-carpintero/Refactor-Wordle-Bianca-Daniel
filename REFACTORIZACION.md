# Documentación de Refactorización — Wordle

## ¿Qué se refactorizó y por qué?

El proyecto partía de un diseño monolítico donde la clase `Game` actuaba como un God Object: gestionaba el estado del juego, manipulaba el DOM, validaba el teclado, evaluaba letras y controlaba la navegación, todo en un mismo sitio. Cualquier cambio en una de estas partes afectaba inevitablemente a las demás, haciendo el código difícil de mantener y de testear.

La refactorización divide esas responsabilidades en clases independientes siguiendo los principios SOLID. `Game` pasa a ser un modelo puro que solo gestiona el estado. `WordEvaluator` se encarga exclusivamente de comparar la palabra introducida con la objetivo. `KeyboardInput` maneja la validación y transformación de teclas. `Interface` centraliza toda interacción con el DOM. `NavigationHandler` decide cuándo redirigir al jugador. Y `GameController` actúa como orquestador, recibiendo todas estas piezas por inyección de dependencias y coordinándolas sin contener lógica de negocio propia.

En una iteración posterior se añadieron dos mejoras adicionales orientadas al desacoplamiento. Por un lado, se extrajo la interfaz `IWordEvaluator` a su propio archivo, de modo que `Game` ya no depende de la clase concreta `WordEvaluator` sino de una abstracción; esto permite sustituir el evaluador por cualquier otra implementación sin tocar la lógica del juego. Por otro lado, `Game` dejó de importar las constantes globales de `env.ts` y empezó a recibirlas como parámetros de constructor (`maxWordSize` y `maxAttempts`), eliminando la dependencia implícita a un módulo externo y haciendo la clase completamente autocontenida y testeable de forma aislada.

Además se corrigieron dos bugs: el algoritmo de evaluación de letras fallaba con letras duplicadas, ya que usaba `RegExp` para contar ocurrencias sin marcar las letras ya consumidas; ahora usa un algoritmo de dos pasadas que lo resuelve correctamente. También se arregló el estado del teclado, que sobreescribía colores verdes o naranjas con gris al final de cada turno; ahora se respeta una prioridad de estados para que un color mejor nunca sea degradado.

Por último, se unificó el diseño visual de las páginas de victoria y derrota con un nuevo archivo `winLose.css` compartido, y se añadieron tres nuevas clases CSS al teclado para reflejar los mismos colores que las celdas de la cuadrícula.
