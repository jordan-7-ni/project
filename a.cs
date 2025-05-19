body {
  background-color: #f5f5f5;
}
.game-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: auto;
  background-color: #222;
  border: 2px solid #fff;
  overflow: hidden;
}
.paddle {
  position: absolute;
  bottom: 10px;
  left: 250px; /* nilai awal sesuai JS */
  width: 100px;
  height: 10px;
  background-color: #007bff;
  border-radius: 5px;
}

.ball {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
.brick {
  position: absolute;
  width: 50px;
  height: 20px;
  background-color: #28a745;
  border: 1px solid #155724;
  border-radius: 3px;
}
.brick.break {
  background-color: transparent;
}
.info {
  text-align: center;
  margin-top: 10px;
}
.lives {
  color: red;
}

