export class SimilaridadeDeCosseno {
  static produtoVetorial(a: number[], b: number[]): number {

    let produto = 0;

    for (let i = 0; i < a.length; i++) {
      produto += a[i] * b[i];
    };

    return produto;
  }

  static magnitude(a: number[]): number {
    let somaDosQuadrados = 0;

    for (let i = 0; i < a.length; i++) {
      somaDosQuadrados += a[i] ** 2;
    };

    return Math.sqrt(somaDosQuadrados);
  };

  static calcular(a: number[], b: number[]): number {
    const produtoVetorial = SimilaridadeDeCosseno.produtoVetorial(a, b);
    const magnitudeA = SimilaridadeDeCosseno.magnitude(a);
    const magnitudeB = SimilaridadeDeCosseno.magnitude(b);

    if (magnitudeA === 0 || magnitudeB === 0) {
      throw new Error("Os vetores devem ser não-nulos.");
    };
    console.log(produtoVetorial / (magnitudeA * magnitudeB));
    return produtoVetorial / (magnitudeA * magnitudeB);
  }

};