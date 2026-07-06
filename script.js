const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('show'); });
},{threshold:.12});
$$('.reveal').forEach(el=>revealObserver.observe(el));

// Corpo interativo
const discoveredParts = new Set();
const totalParts = $$('.body-point').length;
$$('.body-point').forEach(btn=>{
  btn.addEventListener('click',()=>{
    discoveredParts.add(btn.dataset.part);
    $('#bodyTitle').textContent = btn.dataset.part;
    $('#bodyText').textContent = btn.dataset.message;
    const percent = (discoveredParts.size / totalParts) * 100;
    $('#bodyProgress').style.width = percent + '%';
    $('#bodyCount').textContent = `${discoveredParts.size} partes descobertas`;
    if(discoveredParts.size === totalParts){
      $('#bodyText').textContent = 'Você descobriu tudo, Gaby. Mesmo que existam dores em lugares diferentes, nenhuma delas diminui o quanto você é preciosa.';
    }
  });
});

// Chat estilo WhatsApp
const chatBox = $('#chatBox');
const chatSequences = {
  carinho: [
    ['Gaby','Hoje parece que tudo pesou em mim...'],
    ['Rafihx','Então deixa eu dividir esse peso com você por alguns segundos. Você não precisa fingir força aqui.'],
    ['Gaby','Eu só queria me sentir em paz.'],
    ['Rafihx','Você merece paz, descanso e um amor que não te faça duvidar do seu valor.']
  ],
  dor: [
    ['Gaby','Meu peito ficou pesado de novo.'],
    ['Rafihx','Eu sinto muito por você passar por isso. Respira devagar, meu amor. Essa dor não define você.'],
    ['Gaby','Às vezes meu corpo parece cansado de tudo.'],
    ['Rafihx','Seu corpo está pedindo cuidado, não cobrança. Hoje você merece calma, água, descanso e carinho.']
  ],
  forca: [
    ['Gaby','Eu acho que estou fraca.'],
    ['Rafihx','Não. Você está cansada. E existe uma diferença enorme entre estar cansada e ser fraca.'],
    ['Gaby','Tenho medo de não conseguir.'],
    ['Rafihx','Você não precisa conseguir tudo sozinha. Um passo pequeno hoje já é uma vitória linda.']
  ]
};
function addBubble(name,text){
  const div = document.createElement('div');
  div.className = `bubble ${name === 'Gaby' ? 'gaby':'rafihx'}`;
  div.innerHTML = `<small>${name}</small>${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
addBubble('Gaby','Rafihx... hoje a semana está pesada e minhas dores estão me deixando cansada.');
addBubble('Rafihx','Eu estou aqui, Gaby. Mesmo de longe, quero que esse lugar seja um abraço para você respirar um pouco.');
$$('.quick-replies button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const seq = chatSequences[btn.dataset.reply];
    let delay = 0;
    seq.forEach(([name,text])=>{
      delay += 450;
      setTimeout(()=>addBubble(name,text),delay);
    });
  });
});

// Roleta
const wheelMessages = [
  'Você merece descanso sem culpa.',
  'A dor de hoje não apaga a pessoa incrível que você é.',
  'Rafihx te ama muito e quer te ver bem. ❤️',
  'Respira. Só por agora. Só um pouquinho.',
  'Sua semana pode ser pesada, mas você não precisa carregar tudo sozinha.',
  'Você não é um peso. Você é importante.',
  'Seu cansaço merece cuidado, não cobrança.',
  'Mesmo nos dias difíceis, você continua sendo maravilhosa.',
  'A ansiedade fala alto, mas ela não manda no seu valor.',
  'Um dia eu quero cuidar de todas as suas dores.'
];
let spins = 10;
$('#spinBtn').addEventListener('click',()=>{
  if(spins <= 0){ $('#wheelOutput').textContent = 'Os giros acabaram, mas o carinho continua aqui.'; return; }
  spins--;
  $('#wheel').style.transform = `rotate(${(10-spins)*720 + Math.random()*360}deg)`;
  const msg = wheelMessages[Math.floor(Math.random()*wheelMessages.length)];
  setTimeout(()=>{$('#wheelOutput').textContent = msg; $('#spinCount').textContent = `${spins} giros restantes`;},800);
});

// Jardim
const gardenMessages = [
  'Uma flor para lembrar que você ainda floresce.',
  'Outra flor para o seu descanso.',
  'Uma flor para seu peito respirar.',
  'Uma flor para sua cabeça desacelerar.',
  'Uma flor para suas dores encontrarem calma.',
  'Uma flor para seu sorriso voltar no tempo certo.',
  'Uma flor para lembrar: você é amada.',
  'Uma flor final: obrigado por existir, Gaby.'
];
gardenMessages.forEach((msg,i)=>{
  const b=document.createElement('button');
  b.className='flower'; b.textContent='🌷'; b.title='Flor escondida';
  b.addEventListener('click',()=>{b.classList.add('open'); $('#gardenOutput').textContent=msg;});
  $('#garden').appendChild(b);
});

// Decisões
const choiceMessages = {
  cansada:'Então hoje a missão é simples: não se cobrar tanto. Você já fez muito só por continuar.',
  ansiosa:'Quando a ansiedade vier, lembra que você pode pausar. Inspira, segura um pouquinho e solta devagar.',
  dor:'Eu queria tirar essa dor de você. Enquanto não posso, deixo aqui uma frase: você merece cuidado e calma.',
  melhor:'Que bom ler isso. Guarda esse pedacinho de melhora como prova de que dias leves ainda existem.'
};
$$('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>{$('#choiceOutput').textContent=choiceMessages[btn.dataset.choice]}));

// Cartas
const letters = [
  ['Segunda','Que a semana comece sem te esmagar. Você não precisa ser perfeita, só precisa ser cuidada também.'],
  ['Terça','Se o cansaço aparecer, lembra: parar um pouco não é desistir, é se proteger.'],
  ['Quarta','Eu sei que esse dia pode pesar mais. Então aqui vai um abraço em forma de palavras: você consegue passar por hoje.'],
  ['Quinta','Você já atravessou tanta coisa. Não diminua sua coragem só porque está cansada.'],
  ['Sexta','Se o corpo reclamar, escuta com carinho. Você merece descanso e não precisa explicar sua dor para merecer cuidado.'],
  ['Sábado','Mesmo trabalhando, mesmo cansada, você continua sendo luz. Espero que algo bom te encontre hoje.'],
  ['Domingo','Que hoje você respire mais leve e lembre que uma nova semana não precisa repetir as dores da anterior.']
];
letters.forEach(([day,text])=>{
  const card=document.createElement('button');
  card.className='letter';
  card.innerHTML=`<strong>💌 ${day}</strong><span>Toque para abrir</span><p>${text}</p>`;
  card.addEventListener('click',()=>card.classList.toggle('open'));
  $('#lettersGrid').appendChild(card);
});

// Céu de estrelas
const starMessages = [
  'Você é mais forte do que pensa.', 'Seu coração merece calma.', 'Rafihx está torcendo por você.',
  'Você não é suas dores.', 'Seu descanso importa.', 'Você merece amor leve.', 'Amanhã pode ser melhor.',
  'Sua existência é preciosa.', 'Não se cobre tanto.', 'Respira, meu amor.'
];
for(let i=0;i<45;i++){
  const s=document.createElement('button');
  s.className='star'; s.textContent='✦';
  s.style.left=Math.random()*96+'%'; s.style.top=Math.random()*88+'%'; s.style.fontSize=(12+Math.random()*18)+'px';
  s.addEventListener('click',()=>{$('#starOutput').textContent=starMessages[Math.floor(Math.random()*starMessages.length)]});
  $('#sky').appendChild(s);
}

// Final
$('#secretBtn').addEventListener('click',()=>{
  $('#secretFinal').innerHTML = 'Última mensagem: Gaby, se algum dia a semana te fizer esquecer do seu valor, volta aqui. Eu deixei pedaços do meu carinho espalhados por cada canto desse site para você nunca se sentir sozinha.';
});
