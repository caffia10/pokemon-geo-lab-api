@~/dev/pokemon-lab-hub/ARCHITECTURE.md
@~/dev/pokemon-lab-hub/LEARNING_MODE.md

# geo (pokemon-geo-lab-api)

## Responsabilidad

Geografía del mundo Pokémon: **regiones → towns → edificios** (centro, laboratorio, gym,
policía, casa). Es el único servicio con datos fuertemente relacionales, por eso usa
PostgreSQL.

**No hace:** datos de gimnasios (líder, medalla: eso es de `gym`) ni de profesores (eso es de
`professor`). Un edificio de tipo `gym` o `laboratory` es solo un lugar. El detalle lo
tiene el otro servicio, que referencia el edificio por id.

## Paradigma: OOP con DI por decoradores, arquitectura hexagonal

Cada módulo (`region`, `town`, `building`) tiene:
- `domain/` — tipos, reglas (`building.rules.ts`) y el **puerto** del repositorio: una
  interfaz más un `Symbol` del mismo nombre que sirve de token de inyección.
- `application/` — un use case por archivo. Las interfaces de los use cases están en
  `usecases.interfaces.ts` y las implementaciones `Default*` se registran en el módulo.
- `infrastructure/` — controller, repositorio Drizzle, schema y relaciones.

Lo que se estudia acá:
- El contenedor de DI de Nest: providers, tokens, `useClass` y alcance por módulo.
- El patrón interface más `Symbol` homónimo para inyectar puertos (TypeScript borra las
  interfaces en runtime).
- Drizzle: schema como código, relaciones y migraciones (`drizzle/`).
- Validación en el borde con `class-validator`.

## Comandos

```bash
npm run start:dev
npx drizzle-kit generate && npx drizzle-kit migrate
npm run lint && npm test
```

Tiene `package-lock.json` y `bun.lockb`: usar npm hasta unificar el package manager.

## Endpoints

`POST /regions` · `GET /regions/:id` · `GET /regions/full/:id` ·
`POST /towns` · `GET /towns/:id` · `POST /buildings` · `GET /buildings/:id`
