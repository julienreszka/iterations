<template>
  <v-container
      class="maxwidth nopadding">
      <div>
        <v-text-field label="Filename" hint="Example: lips" v-model="filename"></v-text-field>
      </div>
      <div>
        <div id="paint">
          <canvas id="myCanvas"></canvas>
        </div>
        <br>
        <div>
          <div v-for="(image) in imagesByRecent" :key="image.id" class="mb-2">
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                {{
                  image.uid +1
                }} / {{
                  imagesByRecent.length
                }} 
                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <div class="paint">
                <v-img :src="getImage(image.imageData)"></v-img>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn  text @click="makeMainDrawing(image.imageData)">
                  <v-icon left>
                    mdi-brush
                  </v-icon>
                  Continue
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  :download="`${filename}-${Date.now()}.png`"
                  :href="getImage(image.imageData)"
                >
                  <v-icon left>
                    mdi-content-save
                  </v-icon>
                  Save File
                </v-btn>
                
                
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    methods: {
      downloadImage(image){
        window.location.href = 'data:application/octet-stream;base64,' + image
      },
      getImage(
        imageData
      ) {
        var canvas = document.createElement("canvas")
        var ctx = canvas.getContext("2d")
        canvas.width = imageData.width
        canvas.height = imageData.height
        ctx.putImageData(imageData ,0,0)
        var image = canvas.toDataURL("image/png")
        return (
          image
        )
      },
      makeMainDrawing(imageData){
        console.log("makeMainDrawingStart")
        this.ctx.putImageData(imageData, 0, 0)
        window.scrollTo(0,0);
      },
      setup() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.painting = document.getElementById('paint');
        this.paint_style = window.getComputedStyle(this.painting);
      }
    },
    mounted() {
      this.setup()
      
      this.canvas.width = parseInt(
        this.paint_style.getPropertyValue('width')
      );
      this.canvas.height = parseInt(
        this.paint_style.getPropertyValue('height')
      );

      var mouse = {x: 0, y: 0};

      this.canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      }, false);

      this.ctx.lineWidth = 3;
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = 'black';

      this.canvas.addEventListener('mousedown', (e)=> {
        console.log(e)
        this.ctx.beginPath();
        this.ctx.moveTo(mouse.x, mouse.y);

        this.canvas.addEventListener('mousemove', onPaint, false);
      }, false);

      this.canvas.addEventListener('mouseup', () => {
          console.log("mouseup")
          var newImageData = this.ctx.getImageData(0,0, 320,320)
          
          this.images.push(
            {
              imageData: newImageData,
              uid: this.numImages
            }
          )
          this.numImages++
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.canvas.removeEventListener('mousemove', onPaint, false);
      }, false);

      var onPaint = ()=> {
          this.ctx.lineTo(mouse.x, mouse.y);
          this.ctx.stroke();
      };
    },
    computed: {
      imagesByRecent() {
        var reversed = this.images.slice().sort((a,b)=>{return(b.uid - a.uid)})
        return (
          reversed
        )
      }
    },
    data(){
      return {
        numWidth:320,
        filename: '',
        numImages: 0,
        images: [
          
        ],
        canvas: null,
        canvas2: null,
        ctx: null,
        ctx2: null,
        paint_style: null,
      }
    }
  }
</script>

<style scoped>

#inspire {
  background-color:	#F5F5F5;  
}

#paint {
  width: 320px;
  height:320px;
  border: 1px solid black;
  background-color: white;
}

.paint {
  width: 320px;
  height:320px;
}

.v-card__title {
  word-break: keep-all;
}


.nopadding {
  padding:0px; 
}

.maxwidth {
  max-width:320px;
}


</style>
