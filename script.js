let medicamentos = []

// =====================
// CARGAR DATOS
// =====================
async function cargarDatos() {
  try {
    let res = await fetch("data/base_medicamentos.json")
    medicamentos = await res.json()

    console.log("Datos cargados:", medicamentos.length)
  } catch (e) {
    console.error("Error cargando JSON", e)
  }
}

cargarDatos()

// =====================
// BUSQUEDA INDIVIDUAL
// =====================
function buscar() {
  let texto = document.getElementById("busqueda").value.toUpperCase().trim()

  console.log("Buscando:", texto)

  let resultados = medicamentos.filter(m =>
    (m.producto && m.producto.toUpperCase().includes(texto)) ||
    (m.descripcion && m.descripcion.toUpperCase().includes(texto)) ||
    (m.descripcionatc && m.descripcionatc.toUpperCase().includes(texto)) ||
    (m.descripcioncomercial && m.descripcioncomercial.toUpperCase().includes(texto)) ||
    (m.cum && m.cum.includes(texto))
  )

  console.log("Resultados:", resultados.length)

  let html = ""

  if (resultados.length === 0) {
    html = "<p>No se encontraron resultados</p>"
  } else {
    resultados.forEach(r => {
      let codigo = r.codigo ? r.codigo : "NO TIENE NOPOS"

      html += `
      <div>
        <b>${r.producto || ""}</b><br>
        CUM: ${r.cum || ""}<br>
        FORMA: ${r.formafarmaceutica || ""}<br>
        CODIGO NOPOS: ${codigo}
      </div>
      <hr>
      `
    })
  }

  document.getElementById("resultados").innerHTML = html
}

// =====================
// BUSQUEDA POR ARCHIVO
// =====================
function buscarArchivo() {

  let input = document.getElementById("archivo")

  if (!input.files.length) {
    alert("Selecciona un archivo")
    return
  }

  let archivo = input.files[0]
  let reader = new FileReader()

  reader.onload = function (e) {

    let data = new Uint8Array(e.target.result)
    let workbook = XLSX.read(data, { type: "array" })
    let hoja = workbook.Sheets[workbook.SheetNames[0]]
    let filas = XLSX.utils.sheet_to_json(hoja, { header: 1 })

    // LIMPIAR DATOS DEL ARCHIVO
    let textos = filas
      .flat()
      .filter(x => x !== null && x !== undefined && String(x).trim() !== "")
      .map(x => String(x).trim().toUpperCase())

    console.log("Textos archivo:", textos.length)

    let resultados = medicamentos.filter(m =>
      textos.some(t =>
        (m.producto && m.producto.toUpperCase().includes(t)) ||
        (m.descripcion && m.descripcion.toUpperCase().includes(t)) ||
        (m.descripcionatc && m.descripcionatc.toUpperCase().includes(t)) ||
        (m.descripcioncomercial && m.descripcioncomercial.toUpperCase().includes(t))
      )
    )

    console.log("Resultados archivo:", resultados.length)

    let html = ""

    if (resultados.length === 0) {
      html = "<p>No se encontraron resultados</p>"
    } else {
      resultados.forEach(r => {
        let codigo = r.codigo ? r.codigo : "NO EN NOPOS"

        html += `
        <div>
          <b>${r.producto || ""}</b><br>
          CUM: ${r.cum || ""}<br>
          CODIGO NOPOS: ${codigo}
        </div>
        <hr>
        `
      })
    }

    document.getElementById("resultadosArchivo").innerHTML = html
  }

  reader.readAsArrayBuffer(archivo)
}
