from flask import Flask, jsonify
from flask_cors import CORS
from flask.globals import request
from math import dist
import csv

app = Flask(__name__)
CORS(app)

class Persona:
    def __init__(self, name, fever, tiredness, dryCough, difficultyInBreathing, soreThroat, pains, nasalCongestion, runnyNose, diarrhea):
        self.name = name
        self.fever = fever
        self.tiredness = tiredness
        self.dryCough = dryCough
        self.difficultyInBreathing = difficultyInBreathing
        self.soreThroat = soreThroat
        self.pains = pains
        self.nasalCongestion = nasalCongestion
        self.runnyNose = runnyNose
        self.diarrhea = diarrhea
        self.infected = 0
        self.point = (fever + tiredness + dryCough,  difficultyInBreathing + soreThroat + pains + nasalCongestion + runnyNose + diarrhea)
        self.distance = 0
    def findDistance(self, comun, extranio):
        punto = (comun, extranio)
        self.distance = dist(self.point, punto)

personas = []

datasets = []

minimos = []

@app.route('/')
def ping():
    return "API Running..."

@app.route('/personas')
def getPersonas():
    return jsonify(personas)

@app.route('/datasets')
def getDataSet():
    return jsonify(datasets)

@app.route('/personas/<string:persona_name>')
def getPersona(persona_name):
    personasFound = [persona for  persona in personas if persona['name'] == persona_name]
    if len(personasFound) > 0 :
        return jsonify(personasFound)
    return jsonify({"message": "persona not found"})
    
@app.route('/personas', methods = ['POST'])
def addPersona():
    newPersona = {
        "name":request.json['name'],
        "fever": request.json['fever'],
        "tiredness": request.json['tiredness'],
        "dry-cough": request.json['dry-cough'],
        "difficulty-in-breathing":request.json['difficulty-in-breathing'],
        "sore-throat":request.json['sore-throat'],
        "pains": request.json['pains'],
        "nasal-congestion": request.json['nasal-congestion'],
        "runny-nose":request.json['runny-nose'],
        "diarrhea": request.json['diarrhea'],
    }
    personas.append(newPersona)
    return jsonify({"message": "Persona Added Succesfully", "personas": personas})

@app.route('/personas/<string:persona_name>', methods=['PUT'])
def editPersona(persona_name):
    personaFound = [persona for persona in personas if persona['name'] == persona_name]
    if len(personaFound) > 0:
        personaFound[0]['name'] = request.json['name']
        personaFound[0]['fever'] = request.json['fever']
        personaFound[0]['tiredness'] = request.json['tiredness']
        personaFound[0]['dry-cough'] = request.json['dry-cough']
        personaFound[0]['difficulty-in-breathing'] = request.json['difficulty-in-breathing']
        personaFound[0]['sore-throat'] = request.json['sore-throat']
        personaFound[0]['pains'] = request.json['pains']
        personaFound[0]['nasal-congestion'] = request.json['nasal-congestion']
        personaFound[0]['runny-nose'] = request.json['runny-nose']
        personaFound[0]['diarrhea'] = request.json['diarrhea']
        return jsonify({
            "message": "Persona Updated",
            "persona": personaFound[0]
        })
    return jsonify({"message": "Persona Not found"})

@app.route('/personas/<string:persona_name>', methods = ['DELETE'])
def deletePersona(persona_name):
    personasFound = [persona for persona in personas if persona['name'] == persona_name]
    if len(personasFound) > 0:
        personas.remove(personasFound[0])
        return jsonify({
            "message": "Persona Deleted",
            "personas": personas
        })
    return jsonify({"message": "Persona Not Found"})

@app.route('/datasets', methods = ['POST'])
def ReadDataSet():
    with open('Cleaned-Data.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for line in csv_reader:
            newDataset = {
                "fever": line[0],
                "tiredness": line[1],
                "dry-cough": line[2],
                "difficulty-in-breathing": line[3],
                "sore-throat": line[4],
                "pains": line[6],
                "nasal-congestion": line[7],
                "runny-nose": line[8],
                "diarrhea": line[9],
                "infected": line[10]
            }
            datasets.append(newDataset)
    return jsonify({"message": "Dataset Done"})

@app.route('/knn', methods = ['POST'])
def addPersonaKnn():

    datasets.clear()
    minimos.clear()

    comun = request.json['fever'] + request.json['tiredness'] + request.json['dry-cough']
    extranio = request.json['difficulty-in-breathing'] + request.json['sore-throat'] + request.json['pains'] + request.json['nasal-congestion'] + request.json['runny-nose'] + request.json['diarrhea']
    punto_1 = (comun, extranio)

    with open('Cleaned-Data.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for line in csv_reader:
            fever = int(line[0])
            tiredness = int(line[1])
            dryCough = int(line[2])
            difficultyInBreathing = int(line[3])
            soreThroat = int(line[4])
            pains = int(line[6])
            nasalCongestion = int(line[7])
            runnyNose =  int(line[8])
            diarrhea =  int(line[9])
            infected =  int(line[10])
            comun_dt = fever + tiredness + dryCough
            extranio_dt = difficultyInBreathing + soreThroat + pains + nasalCongestion + runnyNose + diarrhea
            punto_2 = (comun_dt, extranio_dt)
            newDataset = {
                "fever": fever,
                "tiredness": tiredness,
                "dry-cough": dryCough,
                "difficulty-in-breathing": difficultyInBreathing,
                "sore-throat": soreThroat,
                "pains": pains,
                "nasal-congestion": nasalCongestion,
                "runny-nose": runnyNose,
                "diarrhea": diarrhea,
                "infected": infected,
                "distance" : dist(punto_1, punto_2)
            }
            datasets.append(newDataset)
            
    k = 1000

    for i in range(k):
        min = datasets[0]
        for item in datasets:
            if item['distance'] < min['distance']:
                min = item
        minimos.append(min)
        datasets.remove(min)

    infectado = 0

    for item in minimos:
        if item['infected'] == 1:
            infectado += 1

    estado = infectado / k * 100

    newPersona = {
        "name":request.json['name'],
        "fever": request.json['fever'],
        "tiredness": request.json['tiredness'],
        "dry-cough": request.json['dry-cough'],
        "difficulty-in-breathing":request.json['difficulty-in-breathing'],
        "sore-throat":request.json['sore-throat'],
        "pains": request.json['pains'],
        "nasal-congestion": request.json['nasal-congestion'],
        "runny-nose":request.json['runny-nose'],
        "diarrhea": request.json['diarrhea'],
        "estado" : estado
    }
    personas.append(newPersona)
    return jsonify({"message": "Persona Added Succesfully", "personas": personas})

@app.route('/minimos')
def getMinimo():
    return jsonify(minimos)

if __name__ == '__main__':
    app.run(debug=True, port=9000)