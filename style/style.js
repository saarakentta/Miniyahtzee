import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../metrics/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    height: verticalScale(70),
    width: horizontalScale(380)
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#433878',
    flexDirection: 'row',
    height: verticalScale(50)
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#E4B1F0',
    flexDirection: 'row',
    height: verticalScale(40)
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(25),
    textAlign: 'center',
    margin: moderateScale(10),

  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(15),
    textAlign: 'center',
    margin: moderateScale(10),
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  top: {
    fontSize: 24, 
    textAlign: 'center'
  },
  homebutton: {
    backgroundColor: '#7E60BF',
    paddingVertical: 12, 
    paddingHorizontal: 24,   
    borderRadius: 8, 
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
},
homebuttonText: {
    color: 'white',
    fontSize: 16,              
    fontWeight: 'bold',       
},
icon: {
  flex: 0.6,               
  alignItems: 'center',
},
textinput: {
  backgroundColor: '#FFE1FF',
  width: '60%',
  marginTop: 16,
  marginBottom: 16,
},
rules: {
  marginTop: 16,
  marginBottom: 16,
}, 
iconContainer: {
  marginBottom: 20,
  alignItems: 'center',
},
promptText: {
  fontSize: 16,
  textAlign: 'center',
  marginVertical: 10,
},
rulesContainer: {
  marginTop: 10,
  padding: 5,
},
rulesTitle: {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
},
rulesText: {
  fontSize: 14,
  textAlign: 'left',
  marginBottom: 10,
},
rulesPlayerText: {
  fontWeight: 'bold',
  fontSize: 18,
  textAlign: 'center',
  marginTop: 10
},
textinput: {
  backgroundColor: '#FFE1FF',
  width: '60%',
  marginTop: 16,
  marginBottom: 16,
},
homebutton: {
  backgroundColor: '#7E60BF',
  paddingVertical: 12, 
  paddingHorizontal: 24,   
  borderRadius: 8, 
  alignItems: 'center',
  marginLeft: 20,
  marginRight: 20,
},
homebuttonText: {
  color: 'white',
  fontSize: 16,              
  fontWeight: 'bold',       
},
playButton: {
  marginTop: 20,
  padding: 8,
  fontSize: 18,
  backgroundColor: '#433878',
  color: '#ffffff'
},
dicerow: {
  marginTop: 15,
},
throwButton: {
  width: "60%",
  marginTop: 16,
  marginBottom: 20,
  backgroundColor: '#7E60BF',
  borderRadius: 8,
},
 centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
  },
  gameboardtexts: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 8
  },
  pointsrow: {
    marginLeft: 20
  },
  pointstoselectrow: {
    marginTop: 5,
    marginBottom:15
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
smallButton: {
    paddingVertical: 2, // Pienentää painikkeen korkeutta
    paddingHorizontal: 5, // Pienentää painikkeen leveyttä
    marginBottom: 10, // Lisää väliä painikkeiden väliin
    backgroundColor: '#433878', // Muuta taustaväri haluamaksesi
},
buttonText: {
    color: '#fff', // Muuta teksti valkoiseksi
    fontSize: 16, // Voit säätää fonttikokoa
    textAlign: 'center', // Keskittää tekstin
},
  
  
});
