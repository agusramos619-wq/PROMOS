# Promos por banco

App web instalable (PWA) que muestra dónde conviene pagar cada día: descuentos bancarios en supermercados, farmacias, combustible y transporte.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La app (diseño y lógica) |
| `promos.json` | Los datos de las promos. Es lo que se actualiza |
| `manifest.json` | Nombre, ícono y colores para instalarla en el celular |
| `sw.js` | Service worker: guarda la app para usarla sin conexión |
| `icons/` | Íconos de la app |

## Publicar en GitHub Pages

1. Entrá a github.com y creá un repositorio nuevo, **público**, llamado `promos`.
2. Tocá **uploading an existing file** y arrastrá todos los archivos, incluida la carpeta `icons`. Después tocá **Commit changes**.
3. Andá a **Settings → Pages**. En *Source* elegí **Deploy from a branch**, en *Branch* elegí **main** y **/ (root)**, y tocá **Save**.
4. Esperá uno o dos minutos. La app queda en `https://TU-USUARIO.github.io/promos/`.

## Instalar en iPhone

Abrí el link en Safari, tocá **Compartir** y después **Agregar a pantalla de inicio**.

## Actualizar

- **Promos:** editá `promos.json` en GitHub (ícono del lápiz) y guardá con *Commit changes*.
- **Diseño:** si cambiás `index.html`, cambiá también `VERSION` en `sw.js` (por ejemplo, `promos-v2`) para que el celular baje la versión nueva.

### Formato de cada promo en `promos.json`

```json
{"cat": "super", "com": "Coto", "ban": "Banco Nación", "dias": "2", "pct": 25, "tope": "Sin tope", "min": "", "medio": "QR BNA+", "nota": ""}
```

- `cat`: `super`, `farma`, `nafta` o `trans`.
- `dias`: los días en que vale la promo, en números. 1 es lunes y 7 es domingo, así que `"56"` significa viernes y sábado. Usá `"*"` para todos los días.
