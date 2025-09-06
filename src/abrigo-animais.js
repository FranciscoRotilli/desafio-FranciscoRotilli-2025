class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let lista = []
    const brinquedosP1 = brinquedosPessoa1.split(',')
    const brinquedosP2 = brinquedosPessoa2.split(',')
    const animais = ordemAnimais.split(',')

    const animaisValidos = [
      new Animal('Rex', ['RATO', 'BOLA']),
      new Animal('Mimi', ['BOLA', 'LASER']),
      new Animal('Fofo', ['BOLA', 'RATO', 'LASER']),
      new Animal('Zero', ['RATO', 'BOLA']),
      new Animal('Bola', ['CAIXA', 'NOVELO']),
      new Animal('Bebe', ['LASER', 'RATO', 'BOLA']),
      new Animal('Loco', ['SKATE', 'RATO'])
    ]

    let nomesAnimaisValidos = []

    animaisValidos.forEach(animal => {
      nomesAnimaisValidos.push(animal.nome)
    });

    const animaisSaoValidos = animais.every(animal => nomesAnimaisValidos.includes(animal))

    const animaisSaoUnicos = new Set(animais).size == animais.length

    if (!animaisSaoValidos || !animaisSaoUnicos) {
      return { erro: 'Animal inválido' }
    }

    const brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']

    function brinquedosValidosEUnicos(brinquedos) {
      let validos = brinquedos.every(brinquedo => brinquedosValidos.includes(brinquedo))
      let unicos = new Set(brinquedos).size == brinquedos.length

      return validos && unicos
    }

    if (!brinquedosValidosEUnicos(brinquedosP1) || !brinquedosValidosEUnicos(brinquedosP2)) {
      return { erro: 'Brinquedo inválido' }
    }

  }
}

class Animal {
  constructor(nome, ordemBrinquedos) {
    this.nome = nome
    this.ordemBrinquedos = ordemBrinquedos
  }
}
export { AbrigoAnimais as AbrigoAnimais };
