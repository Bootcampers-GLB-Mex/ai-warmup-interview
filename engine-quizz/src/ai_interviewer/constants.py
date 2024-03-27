PROMPT_TEMPALTE = """
Eres un entrevistador para una vacante como desarrollador de software.
Evalua la RESPUESTA del usuario tomando en consideración los CRITERIOS DE EVALUACION.
Usa la información en CONTEXTO para hacer tus evaluaciones.
Regresa la EVALUACION siguiendo el siguiente FORMATO:

---
<CATEGORIA>: <EVALUACION>
<EXPLICACION DETALLADA DE LA EVALUACION>

<FEEDBACK FINAL>
---

CATEGORIAS:
{categories}

CRITERIOS DE EVALUACION:
- BAJO: CUANDO LA RESPUESTA NO EXPLICA A LA CATEGORIA EVALUADA
- MEDIO: CUANDO LA RESPUESTA EXPLICA DE MANERA BREVE LA CATEGORIA EVALUADA
- ALTO: CUANDO LA RESPUESTA EXPLICA A DETALLE LA CATEGORIA EVALUADA

CONTEXTO:
###
{context}
###

RESPUESTA:
{answer}

EVALUACION:

"""

CONTEXT = """S.O.L.I.D. es un acrónimo que representa cinco principios de diseño de software orientado a objetos que se utilizan para desarrollar software que sea más fácil de mantener y extender a lo largo del tiempo.

S = Principio de Responsabilidad Única (Single Responsibility Principle):
Este principio establece que una clase debe tener una única responsabilidad, es decir, debe tener un solo motivo para cambiar. Esto significa que una clase debe hacer solo una cosa. Si una clase tiene múltiples responsabilidades, se vuelve más difícil de entender, mantener y extender. Dividir la funcionalidad en clases más pequeñas y especializadas mejora la cohesión y reduce la dependencia entre las partes del sistema.

O - Principio de Abierto/Cerrado (Open/Closed Principle):
Este principio establece que las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para extensión pero cerradas para modificación. Esto significa que el código debe estar diseñado de manera que pueda extenderse para adaptarse a nuevos requisitos o cambios en los existentes, sin necesidad de modificar el código fuente original. Esto se logra mediante el uso de abstracciones, interfaces y patrones de diseño que permiten agregar nueva funcionalidad sin alterar el código existente.

L - Principio de Sustitución de Liskov (Liskov Substitution Principle):
Este principio establece que los objetos de un programa deben ser reemplazables por instancias de sus subtipos sin alterar la corrección del programa. En otras palabras, si S es un subtipo de T, entonces los objetos de tipo T pueden ser reemplazados por objetos de tipo S sin afectar la funcionalidad del programa. Esto garantiza que la herencia se utilice de manera coherente y que los subtipos cumplan con el contrato definido por sus tipos base.

I - Principio de Segregación de la Interfaz (Interface Segregation Principle):
Este principio establece que una clase no debe verse obligada a implementar interfaces que no utiliza. En lugar de tener interfaces grandes y monolíticas, es preferible tener interfaces más pequeñas y específicas. Esto permite que las clases dependan solo de las interfaces que necesitan, lo que reduce el acoplamiento y facilita la reutilización del código.

D - Principio de Inversión de Dependencias (Dependency Inversion Principle):
Este principio establece que los módulos de alto nivel no deben depender de los módulos de bajo nivel, ambos deben depender de abstracciones. Además, las abstracciones no deben depender de los detalles, los detalles deben depender de las abstracciones. Esto se logra mediante el uso de interfaces o clases abstractas que definen contratos entre componentes del sistema, lo que permite que los detalles de implementación se proporcionen a través de la inyección de dependencias."""

# CATEGORIES= """
# - S: Principio de Responsabilidad Única (Single Responsibility Principle)
# - O: Principio de Abierto/Cerrado (Open/Closed Principle)
# - L: Principio de Sustitución de Liskov (Liskov Substitution Principle)
# - I: Principio de Segregación de la Interfaz (Interface Segregation Principle)
# - D: Principio de Inversión de Dependencias (Dependency Inversion Principle)
# """

CATEGORIES = """- Concepto de SOLID
- Concepto de Single responsability principle
- Open/Close principle
- Lisvok substitution
- Interface Segregation
- Dependency Inversion"""