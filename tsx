import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';

const KEY = (Constants.expoConfig?.extra as any)?.OPENAI_API_KEY || '';

export default function App(){
  const [q,setQ]=useState('');
  const [a,setA]=useState('Bienvenido a AmbiVision. Escribe y responde en español.');
  async function ask(){
    if(!KEY){ setA('Falta OPENAI_API_KEY'); return; }
    setA('Pensando...');
    const res = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${KEY}`},
      body:JSON.stringify({
        model:'gpt-4o-mini',
        messages:[{role:'system',content:'Asistente urbano, español.'},{role:'user',content:q}]
      })
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || 'Sin respuesta';
    setA(text);
    Speech.speak(text,{language:'es-ES'});
  }
  return (
    <View style={s.c}>
      <Text style={s.t}>AMBI VISIÓN 👁️</Text>
      <Text style={s.o}>{a}</Text>
      <TextInput style={s.i} placeholder="Escribe aquí" placeholderTextColor="#88a" value={q} onChangeText={setQ}/>
      <TouchableOpacity style={s.b} onPress={ask}><Text style={s.bt}>Enviar</Text></TouchableOpacity>
    </View>
  );
}
const s=StyleSheet.create({
  c:{flex:1,backgroundColor:'#000016',padding:20,justifyContent:'center'},
  t:{color:'#8ab4ff',fontSize:26,letterSpacing:2,marginBottom:12,textAlign:'center'},
  o:{color:'#cde7ff',minHeight:140,marginBottom:12},
  i:{borderWidth:1,borderColor:'#335',color:'#e6f7ff',padding:10,borderRadius:8},
  b:{marginTop:12,backgroundColor:'#151533',padding:12,borderRadius:8,borderColor:'#00E5FF',borderWidth:1,alignItems:'center'},
  bt:{color:'#e6f7ff',fontWeight:'600'}
});