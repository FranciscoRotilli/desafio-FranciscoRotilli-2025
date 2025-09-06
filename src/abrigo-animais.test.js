import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Não deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,BOLA', 'RATO,CAIXA', 'Mimi')
      expect(resultado.lista[0]).toBe('Mimi - abrigo')
      expect(resultado.erro).toBeFalsy()
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'ARRANHADOR,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Gatos tem uso exclusivo dos seus brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA', 'CAIXA,NOVELO', 'Zero,Bebe');
    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Zero - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Gatos não aceitam dividir brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA', 'CAIXA,NOVELO', 'Bebe,Zero,Rex');
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista[2]).toBe('Zero - abrigo');
    expect(resultado.lista.length).toBe(3);
    expect(resultado.erro).toBeFalsy();
  });

  test('Se ambas pessoas podem adotar, animal fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Pessoa não pode levar mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 'NOVELO', 'Rex,Bola,Loco,Bebe');
    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Bola - pessoa 1');
    expect(resultado.lista[2]).toBe('Loco - pessoa 1');
    expect(resultado.lista[3]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco sozinho fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'SKATE,RATO', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco com companhia pode ser adotado independente da ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE', 'CAIXA,NOVELO', 'Loco,Bola');
    expect(resultado.lista[0]).toBe('Bola - pessoa 2');
    expect(resultado.lista[1]).toBe('Loco - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Lista deve ser ordenada alfabeticamente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO', 'LASER,RATO,BOLA', 'Zero,Rex,Mimi');
    expect(resultado.lista[0]).toBe('Mimi - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.lista[2]).toBe('Zero - abrigo');
    expect(resultado.lista.length).toBe(3);
    expect(resultado.erro).toBeFalsy();
  });

  test('Validar que primeira pessoa pode adotar quando segunda não tem brinquedos suficientes', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA', 'LASER', 'Bebe');
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Cães podem compartilhar brinquedos já usados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO', 'LASER', 'Rex,Bola');
    expect(resultado.lista[0]).toBe('Bola - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco deve ter todos brinquedos mesmo sem se importar com ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE', 'RATO', 'Loco,Rex');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve lidar com strings vazias', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('', '', '');
    expect(resultado.lista).toEqual(undefined);
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Múltiplos gatos devem remover brinquedos sequencialmente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,RATO', 'RATO,BOLA', 'Mimi,Zero');
    expect(resultado.lista[0]).toBe('Mimi - pessoa 1');
    expect(resultado.lista[1]).toBe('Zero - pessoa 2');
    expect(resultado.erro).toBeFalsy();
  });
});
