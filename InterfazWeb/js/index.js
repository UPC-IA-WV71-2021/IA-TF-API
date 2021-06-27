var Index = function(){

    var ninimoDatatable = null;

    var options = {
        responsive: true,
        ajax: {
            url: "http://127.0.0.1:5000/minimos",
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

    var graphicData = [];

    var grafica = {
        init: function(){
            this.dataset();
            this.min();
            this.post();
            $("#boton").click(function(e){
                e.preventDefault();
                $("#grafica").CanvasJSChart({
                    animationEnabled: true,
	                zoomEnabled: true,
                    title: {
                        text: "K-Nearest Neighbors"
                    },
                    data: [
                    {
                        type: "bubble",
                        toolTipContent: "Área: {x} & Edad: {y} <br/>Size: {z}",
                        dataPoints: graphicData
                    }
                    ]
                });
                datatable.init();
            });
        },
        dataset: function(){
            $.ajax({
                url: "http://172.24.240.1:5000/dataset",
                method: "GET",
                dataSrc: "",
                success: function(result){  
                    var area;
                    result.forEach(function(persona){
                        if(persona.area == "Urbano")
                            area = 1;
                        else
                            area = 2;
                        if(persona.aprobado == true)
                            graphicData.push({
                                x: area,
                                y: persona.edad,
                                z: 1,
                                color:'rgba(73, 211, 33 , 0.5)'
                            });
                        else
                            graphicData.push({
                                x: area,
                                y: persona.edad,
                                z: 1,
                                color:'rgba(211, 36, 33 ,0.5)'
                            });
                    });
                }
            })
            .done(function(result){
                console.log(result);   
            })
                .fail(function (error) {
                console.log("algo se cayó");
                });
        },
        min: function(){
            $.ajax({
                url: "http://172.24.240.1:9000/minimos",
                method: "GET",
                dataSrc: "",
                success: function(result){  
                    var area;
                    result.forEach(function(persona){
                        if(persona.area == "Urbano")
                            area = 1;
                        else
                            area = 2;
                        if(persona.aprobado == true)
                            graphicData.push({
                                x: area,
                                y: persona.edad,
                                z: 1,
                                color:'rgba(73, 211, 33 , 0.5)'
                            });
                        else
                            graphicData.push({
                                x: area,
                                y: persona.edad,
                                z: 1,
                                color:'rgba(211, 36, 33 ,0.5)'
                            });
                    });
                }
            })
            .done(function(result){
                console.log(result);   
            })
                .fail(function (error) {
                console.log("algo se cayó");
                });
        },
        post: function(){
            var hogarId = localStorage.getItem("hogarId");
            $.ajax({
                url: `http://172.24.240.1:9000/personas/${hogarId}`,
                method: "GET",
                dataSrc: "",
                success: function(result){ 
                    var area;
                    if(result.area == "Urbano")
                        area = 1;
                    else
                        area = 2;
                    graphicData.push({
                        x: area,
                        y: result.edad,
                        z: 5,
                        color:'rgba(0, 0, 0 ,0.5)'
                    });
                    graphicData.push({
                        x: area,
                        y: result.edad,
                        z: 1,
                        color:'rgba(0, 0, 0)'
                    });
                }
            })
            .done(function(result){
                console.log(result);   
            })
                .fail(function (error) {
                console.log("algo se cayó");
                });
        }
    }

    var datatable = {
        init: function(){
            $.noConflict();
            minimoDatatable = $("#minimo_datatable").DataTable(options);
        },
        reload: function() {
            minimoDatatable.ajax.reload();
        }
    }

    return {
        init: function(){
            grafica.init();
        }
    }
}();
$(function(){
    Index.init();
})