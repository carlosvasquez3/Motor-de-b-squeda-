let medicamentos = []

fetch("data/base_medicamentos.json")
.then(res => res.json())
.then(data => medicamentos = data)

function buscar(){

let texto = document.getElementById("busqueda").value.toUpperCase()

let resultados = medicamentos.filter(m =>
    (m.producto && m.producto.toUpperCase().includes(texto)) ||
    (m.cum && m.cum.includes(texto))
)

let html = ""

resultados.forEach(r => {

let codigo = r.codigo ? r.codigo : "NO EN NOPOS"

html += `
<div>
<b>${r.producto}</b><br>
CUM: ${r.cum}<br>
FORMA FARMACEUTICA: ${r.formafarmaceutica}<br>
CODIGO NOPOS: ${codigo}
</div>
<hr>
`

})

document.getElementById("resultados").innerHTML = html

}