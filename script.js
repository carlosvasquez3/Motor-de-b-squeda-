let medicamentos = []

fetch("data/base_medicamentos.json")
.then(res => res.json())
.then(data => medicamentos = data)

function buscar(){

let texto = document.getElementById("busqueda").value.toUpperCase()

let resultados = medicamentos.filter(m =>
    m.producto.includes(texto) ||
    m.cum.includes(texto)
)

let html = ""

resultados.forEach(r=>{
html += `<p>${r.cum} - ${r.producto}</p>`
})

document.getElementById("resultados").innerHTML = html

}