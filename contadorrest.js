var rest = require('restler');
var fs = require('fs');

var host = 'localhost';
var port = '12345';

module.exports = {

     newContador: function(contador, callback){
          contador.prefixo = encodeURIComponent(contador.prefixo);
          contador.descricao = encodeURIComponent(contador.descricao);
          if (contador.descricao != "" && contador.prefixo != ""){
                   rest.post('http://'+host+":"+port+'/notas/contador/new',
                   {
                           data: contador
                   })
                   .on('success', function(data,response){
                           callback(data);
                   })
                   .on('error', function(err, response){
                           callback({message:"Erro ao inserir Contador!!"});
                   })
          } else {
                   callback({message: "Não foi possível inserir Contador!!"});
          }
     },
     
     updateContador: function(descricao, contador, callback) {
            descricao = encodeURIComponent(descricao);
            contador.descricao = encodeURIComponent(contador.descricao);
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.contador = encodeURIComponent(contador.contador);
            contador.casas = encodeURIComponent(contador.casas);
            if (descricao != "") {
                   rest.put('http://'+host+":"+port+'/notas/contador/descricao/'+descricao,
                   {
                           data: contador
                   })
                   .on('success', function(data,response){
                           callback(data);
                   })
                   .on('error', function(err, response){
                           callback({message:"Erro ao atualizar Contador!!"});
                   })
            } else {
                    callback({message: "Não foi possível atualizar Contador!!"});
            }
     },

     getContadores:function(callback){
         rest.get('http://'+host+":"+port+'/notas/contador/all')
                   .on('success', function(data,response){
                           callback(data);
                   })
                   .on('error', function(err,response){
                           callback({message: "Erro ao buscar Contadores!!"});
                   });
     },

     getContadorByPrefixo:function(prefixo, callback){
         prefixo = encodeURIComponent(prefixo);
         if (prefixo != "") {
                  rest.get('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao buscar Contador!!"});
                  });
         } else {
                  callback({message: "Não foi possível buscar Contador!!"});
         }
     },

     deleteContadorByPrefixo: function(prefixo, callback){
         prefixo = encodeURIComponent(prefixo);
         if (prefixo != "") {
                  rest.del('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao excluir Contador!!"});
                  });
         } else {
                  callback({message: "Não foi possível excluir Contador!!"});
         }
     },

     getContadorByDescricao: function(descricao, callback){
         descricao = encodeURIComponent(descricao);
         if (descricao != "") {
                  rest.get('http://'+host+":"+port+'/notas/contador/descricao/'+descricao)
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao buscar Contador!!"});
                  });
         } else {
                  callback({message: "Não foi possível buscar Contador!!"});
         }
     },

     deleteContadorByDescricao: function(descricao, callback){
         descricao = encodeURIComponent(descricao);
         if (descricao != "") {
                  rest.del('http://'+host+":"+port+'/notas/contador/descricao/'+descricao)
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao excluir Contador!!"});
                  });
         } else {
                  callback({message: "Não foi possível excluir Contador!!"});
         }
     },

     updateValorContadorByPrefixo: function(prefixo, valor, callback){
         prefixo = encodeURIComponent(prefixo);
         valor = encodeURIComponent(valor);
         if (prefixo != "" && valor != "") {
                  rest.put('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo+'/casas/'+valor)
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao atualizar o número de casas do Contador!!"});
                  });
         } else {
                  callback({message: "Não foi possível alterar o número de casas do Contador!!"});
         }
     },

     resetContadorByPrefixo: function(prefixo, callback){
         prefixo = encodeURIComponent(prefixo);
         if (prefixo != "") {
                  rest.put('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo+'/reset')
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao reinicializar Contador!!"});
                  });
         } else {
                  callback({message: "Não foi possível reinicializar o contador!!"});
         }
     },

     getNextContadorByPrefixo: function(prefixo, callback){
          prefixo = encodeURIComponent(prefixo);
          if (prefixo != "") {
                  rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/next')
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao buscar próximo valor para o Contador!!"});
                  });
          } else {
                  callback({message: "Não foi possível buscar o próximo valor!!"});
          }
     },

     getPriorContadorByPrefixo: function(prefixo, callback){
          prefixo = encodeURIComponent(prefixo);
          if (prefixo != "") {
                  rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/prior')
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao buscar próximo valor para o Contador!!"});
                  });
          } else {
                  callback({message: "Não foi possível buscar o próximo valor!!"});
          }
     },

     incContadorByPrefixo: function(prefixo, callback){
          prefixo = encodeURIComponent(prefixo);
          if (prefixo != "") {
                  rest.put('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/inc')
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao incrementar o Contador!!"});
                  });
          } else {
                  callback({message: "Não foi possível incrementar o Contador!!"});
          }
     },

     decContadorByPrefixo: function(prefixo, callback){
          prefixo = encodeURIComponent(prefixo);
          if (prefixo != "") {
                  rest.put('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/dec')
                  .on('success', function(data, response){
                           callback(data);
                  })
                  .on('error', function(err, response){
                           callback({message: "Erro ao decrementar o Contador!!"});
                  });
          } else {
                  callback({message: "Não foi possível decrementar o Contador!!"});
          }
     }

};
