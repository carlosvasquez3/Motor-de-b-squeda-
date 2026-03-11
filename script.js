let medicamentos = []

async function cargarDatos(){

try{

let res = await fetch("data/base_medicamentos.json")
medicamentos = await res.json()

console.log("Datos cargados:", medicamentos.length)

}catch(e){

console.error("Error cargando JSON", e)

}

}

cargarDatos()


function buscar(){

let texto = document.getElementById("busqueda").value.toUpperCase()

let resultados = medicamentos.filter(m =>
(m.producto && m.producto.toUpperCase().includes(texto)) ||
(m.descripcionatc && m.descripcionatc.toUpperCase().includes(texto)) ||
(m.descripcioncomercial && m.descripcioncomercial.toUpperCase().includes(texto)) ||
(m.descripcion && m.descripcion.toUpperCase().includes(texto)) ||
(m.cum && m.cum.includes(texto))
)

let html = ""

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

document.getElementById("resultados").innerHTML = html

}

function buscarArchivo(){

let input = document.getElementById("archivo")

let archivo = input.files[0]

let reader = new FileReader()

reader.onload = function(e){

let texto = e.target.result.split("\n")

let resultados = medicamentos.filter(m =>
texto.includes(m.cum)
)

let html = ""

resultados.forEach(r=>{

let codigo = r.codigo ? r.codigo : "NO TIENE NOPOS"

html += `
<div>
${r.cum} - ${r.producto} - CODIGO: ${codigo}
</div>
`

})

document.getElementById("resultadosArchivo").innerHTML = html

}

reader.readAsText(archivo)

}
