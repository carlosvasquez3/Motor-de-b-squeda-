let medicamentos = []

// Función para cargar los datos desde el archivo JSON
async function cargarDatos() {
  try {
    let res = await fetch("data/base_medicamentos.json")
    medicamentos = await res.json()

    console.log("Datos cargados:", medicamentos.length)
  } catch (e) {
    console.error("Error cargando JSON", e)
  }
}

// Llamada para cargar los datos cuando se inicia el script
cargarDatos()

// Función para realizar la búsqueda de medicamentos
function buscar() {
  let texto = document.getElementById("busqueda").value.toUpperCase()

  let resultados = medicamentos.filter(m =>
    (m.producto && m.producto.toUpperCase().includes(texto)) ||
    (m.descripcion && m.descripcion.toUpperCase().includes(texto)) ||
    (m.descripcionatc && m.descripcionatc.toUpperCase().includes(texto)) ||
    (m.descripcioncomercial && m.descripcioncomercial.toUpperCase().includes(texto)) ||
    (m.cum && m.cum.includes(texto))
  )

  let html = ""

  // Si no hay resultados, mostrar un mensaje
  if (resultados.length === 0) {
    html = "<p>No se encontraron resultados</p>"
  } else {
    // Mostrar los resultados
    resultados.forEach(r => {
      let codigo = r.codigo ? r.codigo : "NO TIENE NOPOS"
      html += `
        <div>
          <b>${r.producto}</b><br>
          CUM: ${r.cum}<br>
          FORMA: ${r.formafarmaceutica}<br>
          CODIGO NOPOS: ${codigo}
        </div>
        <hr>
      `
    })
  }

  // Mostrar resultados en el HTML
  document.getElementById("resultados").innerHTML = html
}

// Función para procesar el archivo cargado
function buscarArchivo() {
  let input = document.getElementById("archivo")

  // Si no se ha seleccionado archivo, mostrar un mensaje
  if (!input.files.length) {
    alert("Selecciona un archivo")
    return
  }

  let archivo = input.files[0]
  let reader = new FileReader()

  reader.onload = function (e) {
    // Leer el contenido del archivo Excel
    let data = new Uint8Array(e.target.result)
    let workbook = XLSX.read(data, { type: "array" })
    let hoja = workbook.Sheets[workbook.SheetNames[0]]
    let filas = XLSX.utils.sheet_to_json(hoja, { header: 1 })

    // Obtener todos los textos del archivo y convertir a mayúsculas
    let textos = filas.flat().map(x => String(x).toUpperCase())

    let resultados = medicamentos.filter(m =>
      textos.some(t =>
        (m.producto && m.producto.toUpperCase().includes(t)) ||
        (m.descripcionatc && m.descripcionatc.toUpperCase().includes(t)) ||
        (m.descripcioncomercial && m.descripcioncomercial.toUpperCase().includes(t)) ||
        (m.descripcion && m.descripcion.toUpperCase().includes(t)) ||
        (m.cum && m.cum.includes(t))
      )
    )

    let html = ""

    // Si no se encuentran resultados
    if (resultados.length === 0) {
      html = "<p>No se encontraron resultados</p>"
    } else {
      // Mostrar los resultados
      resultados.forEach(r => {
        let codigo = r.codigo ? r.codigo : "NO EN NOPOS"
        html += `
          <div>
            <b>${r.producto}</b><br>
            CUM: ${r.cum}<br>
            CODIGO NOPOS: ${codigo}
          </div>
          <hr>
        `
      })
    }

    // Mostrar resultados en el HTML
    document.getElementById("resultadosArchivo").innerHTML = html
  }

  reader.readAsArrayBuffer(archivo)
}
