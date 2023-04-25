# Meu Front-End PetDiet

Este pequeno projeto faz parte do MVP do curso de Pós-Gradução em **Engenharia de Software** 

O crescimento do número de cães e gatos em estado de sobrepeso e obesos tem sido uma grande preocupação para Médicos Veterinários especializados em Nutrição e Nutrologia Veterinária que usam tabelas de determinação de Escore de Condição Corporal (ECC).

O produto desenvolvido tem como objetivo facilitar os cálculos de necessidades calóricas destes indivíduos para que o Plano Alimentar seja determinado, caso a caso.

No caso dos cães, o produto irá determinar a taxa de perda de peso em percentagem pois a equação irá utilizar o peso desejado que será calculado de acordo com cada estado no qual o mesmo se encontrar (6 e 7, no sobrepeso; 8 e 9, no obeso). 

Sabendo-se que cada um ponto acima ECC ideal (5) significa 15% a mais de peso, o programa irá utilizar essa informação para determinar a necessidade calórica de cada paciente. 

Para isso é necessário o cálculo do NEM (Necessidade energética de manutenção).

A fórmula para cada animal difere, sendo estabelecida da seguinte forma:

1) cães: NEM = 70 * PC ^ 0.75
2) felinos: NEM 85 x PC ^  0,67
 
Onde PC = Peso Corporal do Animal.

---
## Como executar

Fazer o clone do projeto localmente e abrir o arquivo index.html no seu browser.