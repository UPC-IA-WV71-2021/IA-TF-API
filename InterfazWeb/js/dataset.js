var DataSets = function(){

    var dataSetDatatable = null;

    var options = {
        responsive: true,
        ajax: {
            url: "http://127.0.0.1:5000/datasets",
            method: "get",
            dataSrc: ""
        },
        columns: [
            {
                title: "Fiebre",
                data: "fever"
            },
            {
                title: "Cansancio",
                data: "tiredness"
            },
            {
                title: "Tos Seca",
                data: "dry-cough"
            },
            {
                title: "Dificultad para respirar",
                data: "difficulty-in-breathing"
            },
            {
                title: "Dolor de garganta",
                data: "sore-throat"
            },
            {
                title: "Dolores",
                data: "pains"
            },
            {
                title: "Congesión Nasal",
                data: "nasal-congestion"
            },
            {
                title: "Mucosidad Nasal",
                data: "runny-nose"
            },
            {
                title: "Diarrea",
                data: "diarrhea"
            },
            {
                title: "Infectado",
                data: "infected"
            },
            {
                title: "Distancia",
                data: "distance"
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