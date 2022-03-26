$(function () {
    $("#dataProveedores").DataTable({
        language: {
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "search": "Buscar:",
            "lengthMenu": "Mostrar _MENU_ registros",
            "emptyTable": "No existen usuarios proveedores registrados",
            "zeroRecords": "No se encontraron coincidencias",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(Filtrado de _MAX_ total de entradas)",
            "lengthMenu": "Mostrar _MENU_ entradas"
        },
        responsive: "true",
        dom: "Bfrtilp",
        buttons:[
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Exportar a Excel',
                title: 'Magistral Store',
                messageTop: 'LISTADO DE PROVEEDORES',
                filename: 'Listado de Proveedores',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf"></i>',
                titleAttr: 'Exportar a PDF',
                title: 'Magistral Store',
                filename: 'Listado de Proveedores',
                messageTop: 'Listado de Proveedores',
                className: 'btn btn-danger',
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'Imprimir',
                title: 'Magistral Store',
                filename: 'Listado de Proveedores',
                messageTop: 'Listado de Proveedores',
                className: 'btn btn-info'
            }
        ]
    });
});
  