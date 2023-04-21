// uniform float uTime;

// varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;
// 16/255
// 193/255
// 125/255
void main() {
    // vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.5), vDisplacement);
    // vec3 color =  vec3(vDisplacement*0.8, 0.01, vDisplacement*0.15);
    // vec3 color =  vec3(vDisplacement*0.8, 0.01, 0.15);
    // vec3 color = mix(vNormal, vec3(0.06274, 0.75686, 0.49019), vDisplacement);
    vec3 color = mix(vNormal, vec3(0.06274, 0.75686, 0.49019), vDisplacement);
    // vec3 color =  vec3( vDisplacement*0.06274, vDisplacement*0.75686,  vDisplacement*0.49019);
    gl_FragColor = vec4(color, 1.0);
}