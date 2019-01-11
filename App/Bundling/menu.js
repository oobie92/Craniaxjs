module.exports = function Menus (){
// function Menus(){


  this.MAIN_VENTAPAQUETES = {
    audio: ['N_G4_Si_queres_Un_SB.vox', 'N_G5_SB_para_hablar.vox','N_G7_SB_Navegar.vox'
            , 'N_G6_Si_Necesitas_Hablar.vox', 'N_G9_Para_Duo_Presiona_5.vox', 'N_G10_Para_Trio_press_6.vox',
            'N_G11_Te_Quedaste_Sin_Saldo.vox', 'N_G12_Compra_de_recargas.vox', 'N_M7_PARA_SALIR_DEL_SISTEMA.vox'],
    opts:{
      1: {  name: 'N_SMS1_CHATEA_A_TODA_NICARAGUA.vox',
            type: 'prompt',
            next: true },
      2: {  name: 'N_V1_HABLA_A_TODA_NICA.vox',
            type: 'prompt',
            next: true },
      3: {  name: 'N_D1_NAVEGA_EN_INTERNET.vox',
            type: 'prompt',
            next: true },
      4: {  name: 'PAQUETE_MIXTO',
            type: 'menu' },
      5: {  name: 'DUO',
            type: 'menu' },
      6: {  name: 'TRIO_HABLAR',
            type: 'menu' },
      7: {  name: 'N_RES1_Si_Te_Quedaste_Sin_Saldo.vox',
            type: 'prompt',
            next: true },
      8: {  name: 'RECARGA_CONSULTA',
            type: 'menu' },
      '*': {  name: 'INPUT_NUM_BLOQUEAR',
            type: 'input' }
    },
    next: {
      1: {
        name: 'MENSAJES',
        type: 'menu'
      },
      2: {
        name: 'MINUTOS',
        type: 'menu'
      },
      3: {
        name: 'DATOS',
        type: 'menu'
      },
      7: {
        name: 'RESCATE',
        type: 'menu'
      },
    }  
  }

  this.INPUT_NUM_BLOQUEAR = {
    audio: ['InputReporteRobo.wav'],
    config: {
      type: "input",
      counter: 3,
      min: 2,
      max: 4,
      err: "errLength",
      errPrompt: ['No_coinde.wav']
    },
    opts:{
        name: 'segValidation',
        type: 'backend'
    }
  }

  
}
