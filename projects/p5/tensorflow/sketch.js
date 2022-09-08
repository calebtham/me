// Document
const tl = document.getElementById("tl")
const tr = document.getElementById("tr")
const bl = document.getElementById("bl")
const br = document.getElementById("br")
const loss = document.getElementById("loss")

// Variables
let model;
let resolution = 20;
let cols;
let rows;
let xs;
let epoch = 0;


// Data
const train_xs = tf.tensor2d([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
]);
const train_ys = tf.tensor2d([
    [0],
    [1],
    [1],
    [0]
]);

// Initialize canvas and model
function setup() {
    createCanvas(400, 400);
    cols = width / resolution;
    rows = height / resolution;

    // Create the input data
    let inputs = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = i / cols;
            let x2 = j / rows;
            inputs.push([x1, x2]);
        }
    }
    xs = tf.tensor2d(inputs);

    // Create MLP
    model = tf.sequential();
    let hidden1 = tf.layers.dense({
        inputShape: [2],
        units: 16,
        activation: 'sigmoid'
    });
    let hidden2 = tf.layers.dense({
        units: 16,
        activation: 'sigmoid'
    });
    let output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    });
    model.add(hidden1);
    model.add(hidden2);
    model.add(output);

    model.compile({
        optimizer: tf.train.adam(0.1),
        loss: 'meanSquaredError'
    })

    setTimeout(train, 10);

}

// Train MLP wrapper
function train() {
    trainModel().then(result => {
        epoch++
        loss.innerHTML = "Epoch: " + epoch + "<br>Loss: " + result.history.loss[0]
        setTimeout(train, 10);
    });
}

// Train MLP
function trainModel() {
    return model.fit(
        train_xs,
        train_ys,
        shuffle = true,
        epochs = 1
    );
}

// Draw results every tick
function draw() {
    background(0);

    tf.tidy((e) => {
        // Get the predictions
        let ys = model.predict(xs);
        let y_values = ys.dataSync();

        // Draw the results
        let index = 0;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let brightness = y_values[index] * 255
                fill(brightness);
                noStroke()
                rect(i * resolution, j * resolution, resolution, resolution);
                fill(255 - brightness);
                textSize(8);
                textAlign(CENTER, CENTER);
                text(nf(y_values[index], 1, 2), i * resolution + resolution / 2, j * resolution + resolution / 2)
                index++;
            }
        }

        // Get corners
        tl.innerText = y_values[0]
        tr.innerText = y_values[cols - 1]
        bl.innerText = y_values[cols * rows - cols]
        br.innerText = y_values[cols * rows - 1]
    });

}