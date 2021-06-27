var DataSets = function(){

    var dataSetDatatable = null;

    var options = {
        responsive: true,
        ajax: {
            url: "http://172.24.240.1:9000/dataset",
            method: "get",
            dataSrc: ""
        },
        columns: [
            {
                title: "Id",
                data: "hogarId"
            },
            {
                title: "Departamento",
                data: "departamento"
            },
            {
                title: "Provincia",
                data: "provincia"
            },
            {
                title: "Distrito",
                data: "distrito"
            },
            {
                title: "Área",
                data: "area"
            },
            {
                title: "DNI",
                data: "personaId"
            },
            {
                title: "Genero",
                data: "genero"
            },
            {
                title: "Edad",
                data: "edad"
            },
            {
                title: "Estado",
                data: function(result){
                    var estado = result.aprobado;
                    if(estado == true)
                        return "Aprobado";
                    else
                        return "No Aprobado";
                }
            },
            {
                title: "Distancia",
                data: "distancia"
            }
        ]
    };

    var datatable = {
        init: function(){
            dataSetDatatable = $("#dataset_datatable").DataTable(options);
        },
        reload: function() {
            dataSetDatatable.ajax.reload();
        }
    }

    return {
        init: function(){
            datatable.init();
        }
    }
}();
$(function(){
    DataSets.init();
})