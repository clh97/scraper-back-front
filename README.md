# teste-d3
Como funciona:

1. Scraper:  
scraper tem que ser utilizado manualmente para fazer gather das cifras
(tem que trocar o nome do gênero musical no script scraper/main.py)
na variável genre e rodar o script para adicionar o gênero desejado à db.
quando terminar de obter os gêneros musicais, deixe a o arquivo .db no mesmo diretório

2. Back end:  
por padrão roda na porta 3000. roda um endpoint http para cada gênero disponível nos types do arquivo db.js
"npm install"  
"npm run dev" para rodar o projeto. depende da database obtida pelo scraper para entregar os dados via http.  

3. Front end:  
por padrão roda na porta 1234. (parcel)
"npm install"  
"npm run start" para rodar o front. se não conseguir conectar com o back end, fica em loading infinito.  

tomar atenção com o CORS se estiver rodando em localhost,
uma solução é instalar a extensãozinha no navegador :)

Chrome:  
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

FF:  
https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/
