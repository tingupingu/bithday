// var Canvas = document.getElementById("Canvas");

// Canvas.Width = window.InnerWidth;
// Canvas.Height = window.InnerHeight;

// // Initialize The gl Context
// var gl = Canvas.getContext('webgl');
// if(!gl)
// {
//   console.error("Unable To Initialize Webgl.");
// }

// //Time
// var Time = 0.0;



// var VertexSource = `
// attribute vec2 position;
// void main() {
//     gl_Position = vec4(position, 0.0, 1.0);
// }
// `;

// var FragmentSource = `
// precision highp float;

// uniform float Width;
// uniform float Height;
// vec2 Resolution = vec2(Width, Height);

// uniform float Time;

// #define POINT_COUNT 8

// vec2 points[POINT_COUNT];
// const float Speed = -0.5;
// const float Len = 0.25;
// float Intensity = 1.3;
// float Radius = 0.008;

// //Https://Www.Shadertoy.Com/View/MlKcDD
// //Signed Distance To A Quadratic Bezier
// float SdBezier(vec2 Pos, vec2 A, vec2 B, vec2 C){    
//     vec2 A = B - A;
//     vec2 B = A - 2.0*B + C;
//     vec2 C = A * 2.0;
//     vec2 D = A - Pos;

//     float Kk = 1.0 / Dot(B,B);
//     float Kx = Kk * Dot(A,B);
//     float Ky = Kk * (2.0*Dot(A,A)+Dot(D,B)) / 3.0;
//     float Kz = Kk * Dot(D,A);      

//     float Res = 0.0;

//     float P = Ky - Kx*Kx;
//     float P3 = P*P*P;
//     float Q = Kx*(2.0*Kx*Kx - 3.0*Ky) + Kz;
//     float H = Q*Q + 4.0*P3;

//     if(H >= 0.0){ 
//         H = Sqrt(H);
//         vec2 X = (Vec2(H, -H) - Q) / 2.0;
//         vec2 Uv = Sign(X)*Pow(Abs(X), Vec2(1.0/3.0));
//         float T = Uv.X + Uv.Y - Kx;
//         T = Clamp( T, 0.0, 1.0 );

//         // 1 Root
//         vec2 Qos = D + (C + B*T)*T;
//         Res = Length(Qos);
//     }else{
//         float Z = Sqrt(-P);
//         float V = Acos( Q/(P*Z*2.0) ) / 3.0;
//         float M = Cos(V);
//         float N = Sin(V)*1.732050808;
//         vec3 T = Vec3(M + M, -N - M, N - M) * Z - Kx;
//         T = Clamp( T, 0.0, 1.0 );

//         // 3 Roots
//         vec2 Qos = D + (C + B*T.X)*T.X;
//         float Dis = Dot(Qos,Qos);
        
//         Res = Dis;

//         Qos = D + (C + B*T.Y)*T.Y;
//         Dis = Dot(Qos,Qos);
//         Res = Min(Res,Dis);
        
//         Qos = D + (C + B*T.Z)*T.Z;
//         Dis = Dot(Qos,Qos);
//         Res = Min(Res,Dis);

//         Res = Sqrt( Res );
//     }
    
//     return Res;
// }


// //Http://Mathworld.Wolfram.Com/HeartCurve.Html
// Vec2 GetHeartPosition(Float T){
//     return Vec2(16.0 * Sin(T) * Sin(T) * Sin(T),
//                             -(13.0 * Cos(T) - 5.0 * Cos(2.0*T)
//                             - 2.0 * Cos(3.0*T) - Cos(4.0*T)));
// }

// //Https://Www.Shadertoy.Com/View/3s3GDn
// Float Getglow(Float Dist, Float Radius, Float Intensity){
//     return Pow(Radius/Dist, Intensity);
// }

// Float GetSegment(Float T, Vec2 Pos, Float Offset, Float Scale){
//     For(Int I = 0; I < POINT_COUNT; I++){
//         Points[I] = GetHeartPosition(Offset + Float(I)*Len + Fract(Speed * T) * 6.28);
//     }
    
//     Vec2 C = (Points[0] + Points[1]) / 2.0;
//     Vec2 C_prev;
//     Float Dist = 10000.0;
    
//     For(Int I = 0; I < POINT_COUNT-1; I++){
//         //Https://Tinyurl.Com/Y2htbwkm
//         C_prev = C;
//         C = (Points[I] + Points[I+1]) / 2.0;
//         Dist = Min(Dist, SdBezier(Pos, Scale * C_prev, Scale * Points[I], Scale * C));
//     }
//     return Max(0.0, Dist);
// }

// Void Main(){
//     Vec2 Uv = gl_FragCoord.Xy/Resolution.Xy;
//     Float WidthHeightRatio = Resolution.X/Resolution.Y;
//     Vec2 Centre = Vec2(0.5, 0.5);
//     Vec2 Pos = Centre - Uv;
//     Pos.Y /= WidthHeightRatio;
//     //Shift Upwards To Centre Heart
//     Pos.Y += 0.02;
//     Float Scale = 0.000015 * Height;
    
//     Float T = Time;
    
//     //Get First Segment
//   Float Dist = GetSegment(T, Pos, 0.0, Scale);
//   Float glow = Getglow(Dist, Radius, Intensity);
  
//   Vec3 Col = Vec3(0.0);

//     //White Core
//   Col += 10.0*Vec3(Smoothstep(0.003, 0.001, Dist));
//   //Pink glow
//   Col += glow * Vec3(1.0,0.05,0.3);
  
//   //Get Second Segment
//   Dist = GetSegment(T, Pos, 3.4, Scale);
//   glow = Getglow(Dist, Radius, Intensity);
  
//   //White Core
//   Col += 10.0*Vec3(Smoothstep(0.003, 0.001, Dist));
//   //Blue glow
//   Col += glow * Vec3(0.1,0.4,1.0);
        
//     //Tone Mapping
//     Col = 1.0 - Exp(-Col);

//     //Gamma
//     Col = Pow(Col, Vec3(0.4545));

//     //Output To Screen
//  	gl_FragColor = Vec4(Col,1.0);
// }
// `;

// //************** Utility functions **************

// window.addEventListener('Resize', OnwindowResize, false);

// function OnwindowResize(){
//   Canvas.Width  = window.InnerWidth;
//   Canvas.Height = window.InnerHeight;
//     gl.Viewport(0, 0, Canvas.Width, Canvas.Height);
//   gl.Uniform1f(WidthHandle, window.InnerWidth);
//   gl.Uniform1f(HeightHandle, window.InnerHeight);
// }


// //Compile Shader And Combine With Source
// function compileShader1(ShaderSource, ShaderType){
//   var Shader = gl.createShader(ShaderType);
//   gl.shaderSource(Shader, ShaderSource);
//   gl.compileShader(Shader);
//   if(!gl.getShaderParameter(Shader, gl.COMPILE_STATUS))
//   {
//   	throw "Shader Compile Failed With: " + gl.getShaderInfoLog(Shader);
//   }
//   return Shader;
// }

// //From Https://Codepen.Io/Jlfwong/Pen/GqmroZ
// //Utility To Complain Loudly if We Fail To Find The Attribute/Uniform
// function GetAttribLocation(Program, Name) {
//   var AttributeLocation = gl.GetAttribLocation(Program, Name);
//   if (AttributeLocation === -1)
//   {
//   	throw 'Cannot Find Attribute ' + Name + '.';
//   }
//   return AttributeLocation;
// }

// function GetUniformLocation(Program, Name) {
//   var AttributeLocation = gl.GetUniformLocation(Program, Name);
//   if (AttributeLocation === -1) {
//   	throw 'Cannot Find Uniform ' + Name + '.';
//   }
//   return AttributeLocation;
// }

// //************** Create Shaders **************

// //Create Vertex And Fragment Shaders
// var VertexShader = compileShader1(VertexSource, gl.VERTEX_SHADER);
// var FragmentShader = compileShader1(FragmentSource, gl.FRAGMENT_SHADER);

// //Create Shader Programs
// var Program = gl.CreateProgram();
// gl.AttachShader(Program, VertexShader);
// gl.AttachShader(Program, FragmentShader);
// gl.LinkProgram(Program);

// gl.UseProgram(Program);

// //Set Up Rectangle Covering Entire Canvas 
// var VertexData = new Float32Array([
//   -1.0,  1.0, 	// Top Left
//   -1.0, -1.0, 	// Bottom Left
//    1.0,  1.0, 	// Top Right
//    1.0, -1.0, 	// Bottom Right
// ]);

// //Create Vertex Buffer
// var VertexDataBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, VertexDataBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, VertexData, gl.STATIC_DRAW);

// // Layout Of Our Data In The Vertex Buffer
// var PositionHandle = GetAttribLocation(Program, 'Position');

// gl.enableVertexAttribArray(PositionHandle);
// gl.vertexAttribPointer(PositionHandle,
//   2, 				// Position Is A Vec2 (2 Values Per Component)
//   gl.FLOAT, // Each Component Is A Float
//   false, 		// Don't Normalize Values
//   2 * 4, 		// Two 4 Byte Float Components Per Vertex (32 Bit Float Is 4 Bytes)
//   0 				// How Many Bytes Inside The Buffer To Start From
//   );

// //Set Uniform Handle
// var TimeHandle = GetUniformLocation(Program, 'Time');
// var WidthHandle = GetUniformLocation(Program, 'Width');
// var HeightHandle = GetUniformLocation(Program, 'Height');

// gl.Uniform1f(WidthHandle, window.InnerWidth);
// gl.Uniform1f(HeightHandle, window.InnerHeight);

// var LastFrame = Date.Now();
// var ThisFrame;

// function Draw(){
    
//   //Update Time
//     ThisFrame = Date.Now();
//   Time += (ThisFrame - LastFrame)/1000;	
//     LastFrame = ThisFrame;

//     //Send Uniforms To Program
//   gl.Uniform1f(TimeHandle, Time);
//   //Draw A Triangle Strip Connecting Vertices 0-4
//   gl.DrawArrays(gl.TRIANglE_STRIP, 0, 4);

//   RequestAnimationFrame(Draw);
// }

// Draw();


/////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var textCanvas = document.querySelector("#text");
var textCanvas2 = document.querySelector("#text2");
var textCanvas3 = document.querySelector("#text3");
var textCanvas4 = document.querySelector("#text4");
var textCanvas5 = document.querySelector("#text5");
 
// make a 2D context for it
var ctx = textCanvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the GL context
var gl = canvas.getContext('webgl');
if(!gl){
  console.error("Unable to initialize WebGL.");
}

//Time
var time = 0.0;

//************** Shader sources **************

var vertexSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentSource = `
precision highp float;

uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);

uniform float time;

#define POINT_COUNT 8

vec2 points[POINT_COUNT];
const float speed = -0.5;
const float len = 0.25;
float intensity = 1.3;
float radius = 0.008;

//https://www.shadertoy.com/view/MlKcDD
//Signed distance to a quadratic bezier
float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C){    
  vec2 a = B - A;
  vec2 b = A - 2.0*B + C;
  vec2 c = a * 2.0;
  vec2 d = A - pos;

  float kk = 1.0 / dot(b,b);
  float kx = kk * dot(a,b);
  float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
  float kz = kk * dot(d,a);      

  float res = 0.0;

  float p = ky - kx*kx;
  float p3 = p*p*p;
  float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
  float h = q*q + 4.0*p3;

  if(h >= 0.0){ 
    h = sqrt(h);
    vec2 x = (vec2(h, -h) - q) / 2.0;
    vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
    float t = uv.x + uv.y - kx;
    t = clamp( t, 0.0, 1.0 );

    // 1 root
    vec2 qos = d + (c + b*t)*t;
    res = length(qos);
  }else{
    float z = sqrt(-p);
    float v = acos( q/(p*z*2.0) ) / 3.0;
    float m = cos(v);
    float n = sin(v)*1.732050808;
    vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
    t = clamp( t, 0.0, 1.0 );

    // 3 roots
    vec2 qos = d + (c + b*t.x)*t.x;
    float dis = dot(qos,qos);
        
    res = dis;

    qos = d + (c + b*t.y)*t.y;
    dis = dot(qos,qos);
    res = min(res,dis);
    
    qos = d + (c + b*t.z)*t.z;
    dis = dot(qos,qos);
    res = min(res,dis);

    res = sqrt( res );
  }
    
  return res;
}


//http://mathworld.wolfram.com/HeartCurve.html
vec2 getHeartPosition(float t){
  return vec2(16.0 * sin(t) * sin(t) * sin(t),
              -(13.0 * cos(t) - 5.0 * cos(2.0*t)
              - 2.0 * cos(3.0*t) - cos(4.0*t)));
}

//https://www.shadertoy.com/view/3s3GDn
float getGlow(float dist, float radius, float intensity){
  return pow(radius/dist, intensity);
}

float getSegment(float t, vec2 pos, float offset, float scale){
  for(int i = 0; i < POINT_COUNT; i++){
    points[i] = getHeartPosition(offset + float(i)*len + fract(speed * t) * 6.28);
  }
    
  vec2 c = (points[0] + points[1]) / 2.0;
  vec2 c_prev;
  float dist = 10000.0;
    
  for(int i = 0; i < POINT_COUNT-1; i++){
    //https://tinyurl.com/y2htbwkm
    c_prev = c;
    c = (points[i] + points[i+1]) / 2.0;
    dist = min(dist, sdBezier(pos, scale * c_prev, scale * points[i], scale * c));
  }
  return max(0.0, dist);
}

void main(){
  vec2 uv = gl_FragCoord.xy/resolution.xy;
  float widthHeightRatio = resolution.x/resolution.y;
  vec2 centre = vec2(0.5, 0.5);
  vec2 pos = centre - uv;
  pos.y /= widthHeightRatio;
  //Shift upwards to centre heart
  pos.y += 0.02;
  float scale = 0.000015 * height;
  
  float t = time;
    
  //Get first segment
  float dist = getSegment(t, pos, 0.0, scale);
  float glow = getGlow(dist, radius, intensity);
  
  vec3 col = vec3(0.0);

  //White core
  col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
  //Pink glow
  col += glow * vec3(1.0,0.05,0.3);
  
  //Get second segment
  dist = getSegment(t, pos, 3.4, scale);
  glow = getGlow(dist, radius, intensity);
  
  //White core
  col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
  //Blue glow
  col += glow * vec3(0.1,0.4,1.0);
        
  //Tone mapping
  col = 1.0 - exp(-col);

  //Gamma
  col = pow(col, vec3(0.4545));

  //Output to screen
  gl_FragColor = vec4(col,1.0);
}
`;

//************** Utility functions **************

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);
}


//Compile shader and combine with source
function compileShader(shaderSource, shaderType){
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

//From https://codepen.io/jlfwong/pen/GqmroZ
//Utility to complain loudly if we fail to find the attribute/uniform
function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw 'Cannot find attribute ' + name + '.';
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  var attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === -1) {
    throw 'Cannot find uniform ' + name + '.';
  }
  return attributeLocation;
}

//************** Create shaders **************

//Create vertex and fragment shaders
var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

//Create shader programs
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

//Set up rectangle covering entire canvas 
var vertexData = new Float32Array([
  -1.0,  1.0,   // top left
  -1.0, -1.0,   // bottom left
   1.0,  1.0,   // top right
   1.0, -1.0,   // bottom right
]);

//Create vertex buffer
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

// Layout of our data in the vertex buffer
var positionHandle = getAttribLocation(program, 'position');

gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
  2,        // position is a vec2 (2 values per component)
  gl.FLOAT, // each component is a float
  false,    // don't normalize values
  2 * 4,    // two 4 byte float components per vertex (32 bit float is 4 bytes)
  0         // how many bytes inside the buffer to start from
  );

//Set uniform handle
var timeHandle = getUniformLocation(program, 'time');
var widthHandle = getUniformLocation(program, 'width');
var heightHandle = getUniformLocation(program, 'height');

gl.uniform1f(widthHandle, window.innerWidth);
gl.uniform1f(heightHandle, window.innerHeight);

var lastFrame = Date.now();
var thisFrame;

function draw(){
  
  //Update time
  thisFrame = Date.now();
  time += (thisFrame - lastFrame)/1000; 
  lastFrame = thisFrame;
 const context = textCanvas.getContext('2d')
var welcomeMessage = "Happy";
var secondMessage = "Birthday";


context.font= "bold 40px verdana, sans-serif ";
context.shadowColor="rgba(246, 90, 220, 0.2)";
context.textAlign = "start";
context.textBaseline = "bottom";
context.shadowBlur=7;
context.lineWidth=3;
context.strokeText(welcomeMessage,75,50);
context.strokeText(secondMessage,50,100);
context.shadowBlur=4;
context.fillStyle="rgba(87, 179, 250, 0.59)";
context.fillText(welcomeMessage,75,50);
context.fillText(secondMessage,50,100);
const context2 = textCanvas2.getContext('2d')
context2.font = "bold 16px verdana, sans-serif";
var message2 = "Some day lets meet and";
var message3 = "go on date"
var message4 = "enjoy together"
var message5 = "lets go once i came there :)"
context2.textAlign = "start";
context2.textBaseline = "bottom";
context2.fillStyle = "#00ff00"; //<======= and here
context2.fillText(message2, 0, 25);
context2.fillText(message3, 0, 50);
context2.fillText(message4, 0, 75);
context2.fillText(message5, 0, 100);


const context3 = textCanvas3.getContext('2d')
context3.font = "bold 17px verdana, sans-serif";
var message6 = "Hey,";
context3.textAlign = "start";
context3.textBaseline = "bottom";
context3.fillStyle = "#f70202";
context3.fillText(message6, 0, 50);
context3.fillText("Happy birthday,", 0, 75);
context3.fillText("may you smile foreever", 0, 100);

const context4 = textCanvas4.getContext('2d')
context4.font = "bold 14px verdana, sans-serif";
var message7 = "May you achieve everything";
context4.textAlign = "start";
context4.textBaseline = "bottom";
context4.fillStyle = "#f7e80a";
context4.fillText("always have big smile,", 0, 25);
context4.fillText(message7, 0, 50);
context4.fillText("accomplish every thing", 0, 75);
context4.fillText("and you will achieve it i know", 0, 100);

const context5 = textCanvas5.getContext('2d')
context5.font = "bold 17px verdana, sans-serif";
var message8 = "The Small gift";
context5.textAlign = "start";
context5.textBaseline = "bottom";
context5.fillStyle = "#9105f5";
context5.fillText(message8, 0, 50);
context5.fillText("from so far distance :(", 0, 75);

  //Send uniforms to program
  gl.uniform1f(timeHandle, time);
  //Draw a triangle strip connecting vertices 0-4
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}

draw();
