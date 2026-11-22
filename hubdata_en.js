/* 🇬🇧 Cambridge hub summaries (English) — Stage 6–9 (grades 106–109 in practiceen*.js)
   Format = same as hubdata.js: {grade:{lesson:[{t,lv,s,f,k,ex}]}} · lv [] = all levels · merged into STARTER by hub.js
   Hand-written (not generated). Rules: LaTeX in R`…` strings; no dollar sign for money (use the word "dollars"); no Khmer. */
(function(){
"use strict";
var R=String.raw;
function E(t,s,f,k,ex){return{t:t,lv:[],s:s,f:f,k:k,ex:ex}}
/* Checkpoint-style lessons (31–34): exam technique + the key formulas of the area */
function CP(area,f,ex,extra){return E("Exam technique · "+area,
 R`Checkpoint-style papers mix several topics. Paper 1 is non-calculator, Paper 2 allows a calculator.
Read the command word first:
- Work out / Calculate: show the method, then the answer
- Show that: finish on the value you were given
- Explain / Give a reason: write a short sentence using the correct maths word
- Estimate: round every number to 1 significant figure first`,
 f,
 R`- Look at the marks: 1 mark = one step, 3 marks = show at least 3 steps
- Write units in the answer (cm, cm², kg, dollars)
- Check: does the answer make sense? (a probability is never above 1, a length is never negative)`+(extra?"\n"+extra:""),ex)}

var G106={
1:[E("Place value and rounding",R`Each digit has a value that depends on its place. Moving one place left makes a digit 10 times bigger.
To round, look at the digit after the rounding place: 5 or more rounds up, 4 or less stays.`,
 [R`\dfrac1{10}=0.1,\ \ \dfrac1{100}=0.01,\ \ \dfrac1{1000}=0.001`,R`10\times10=100,\ \ 10\times100=1000`],
 R`- Underline the rounding digit, then circle the next digit
- Decimal places (d.p.) count digits after the decimal point
- Write the zeros when rounding a whole number: 6382 to the nearest 100 is 6400`,
 [[R`Round 6382 to the nearest hundred.`,R`The tens digit is 8, so round up: $6400$.`],[R`Round 3.457 to 2 decimal places.`,R`The third decimal is 7, so round up: $3.46$.`]])],
2:[E("Factors, multiples and primes",R`A factor divides exactly into a number. A multiple is in its times table. A prime has exactly two factors (1 and itself); 1 is not prime.
Every number is a product of primes (prime factorisation).`,
 [R`60=2^2\times3\times5`,R`\text{HCF}\times\text{LCM}=a\times b\ \ (\text{for two numbers }a,b)`],
 R`- Use a factor tree: keep splitting until every branch is prime
- HCF = biggest number that divides both; LCM = smallest number in both times tables
- Divisibility: by 3 if the digit sum is a multiple of 3, by 9 likewise`,
 [[R`Write 60 as a product of prime factors.`,R`$60=2\times30=2\times2\times15=2^2\times3\times5$`],[R`Find the LCM of 6 and 8.`,R`Multiples of 8: 8, 16, 24 and 24 is a multiple of 6, so LCM $=24$.`]])],
3:[E("Fractions",R`Fractions with the same denominator add and subtract by combining numerators. For different denominators find a common denominator first.
To multiply, multiply tops and bottoms. To divide, turn the second fraction upside down and multiply.`,
 [R`\dfrac ab+\dfrac cb=\dfrac{a+c}b`,R`\dfrac ab\times\dfrac cd=\dfrac{ac}{bd}`,R`\dfrac ab\div\dfrac cd=\dfrac ab\times\dfrac dc`],
 R`- Simplify at the end by dividing top and bottom by the HCF
- Change mixed numbers to improper fractions before multiplying or dividing
- Cancel before multiplying to keep numbers small`,
 [[R`Work out $\dfrac23+\dfrac14$.`,R`$\dfrac8{12}+\dfrac3{12}=\dfrac{11}{12}$`],[R`Work out $\dfrac34\div\dfrac38$.`,R`$\dfrac34\times\dfrac83=\dfrac{24}{12}=2$`]])],
4:[E("Decimals and percentages",R`Percent means "out of 100". Convert between fractions, decimals and percentages by dividing or multiplying by 100.`,
 [R`x\%=\dfrac x{100}`,R`x\%\text{ of }N=\dfrac x{100}\times N`,R`\dfrac ab\times100=\text{percentage}`],
 R`- 10% = divide by 10, 1% = divide by 100; build other percentages from these
- Fraction to percentage: divide, then multiply by 100
- 50% = 0.5, 25% = 0.25, 75% = 0.75, 20% = 0.2`,
 [[R`Find 35% of 240.`,R`$10\%=24,\ 30\%=72,\ 5\%=12$, so $35\%=72+12=84$`],[R`Write $\dfrac38$ as a percentage.`,R`$3\div8=0.375$, so $37.5\%$`]])],
5:[E("Calculation",R`Work in the correct order: Brackets, Indices, Division and Multiplication (left to right), Addition and Subtraction (left to right).`,
 [R`\text{Brackets}\to\text{Indices}\to\text{Div/Mult}\to\text{Add/Sub}`,R`a\times(b+c)=a\times b+a\times c`],
 R`- Never go left to right blindly: multiplication comes before addition
- For long multiplication/division, estimate first to catch slips
- Check subtraction by adding back`,
 [[R`Work out $18-2\times(3+4)$.`,R`Brackets: $3+4=7$; multiply: $2\times7=14$; subtract: $18-14=4$`]])],
6:[E("Negative numbers",R`Negative numbers are below zero on the number line. Subtracting a negative is the same as adding. Two negatives multiplied give a positive.`,
 [R`a-(-b)=a+b`,R`(-a)\times(-b)=ab`,R`(-a)\times b=-ab`],
 R`- Sketch a number line for temperature or money questions
- Same signs → positive answer; different signs → negative answer (× and ÷)
- A change is: final value − starting value`,
 [[R`Work out $-3-(-7)$.`,R`$-3+7=4$`],[R`The temperature falls from 5 °C to −4 °C. Find the change.`,R`Change $=-4-5=-9$, so the temperature falls by $9$ degrees.`]])],
7:[E("Ratio and proportion",R`A ratio compares quantities. Equivalent ratios are made by multiplying or dividing both parts by the same number.
To share in a ratio, add the parts, find one part, then multiply.`,
 [R`a:b=ka:kb`,R`\text{one part}=\dfrac{\text{total}}{a+b}`,R`\text{unitary method: find 1, then scale}`],
 R`- Write the ratio in simplest form by dividing by the HCF
- Check shares add up to the total
- For proportion, find the value of 1 item first`,
 [[R`Share 60 in the ratio $2:3$.`,R`$2+3=5$ parts, 1 part $=12$, shares $24$ and $36$`],[R`4 pens cost 6 dollars. Find the cost of 10 pens.`,R`1 pen $=1.5$, so 10 pens $=15$ dollars`]])],
8:[E("Formulae and sequences",R`A formula uses letters for numbers: substitute the values, then work out. A sequence follows a rule; the nth term rule gives any term.`,
 [R`n\text{th term}=dn+(a-d)\ \ (d=\text{common difference},\ a=\text{first term})`,R`A=l\times w`],
 R`- Term-to-term rule: what do you add each time? That is the number in front of n
- Substitute with brackets for negatives: $3\times(-2)$
- Test your nth term on the first two terms`,
 [[R`Find the nth term of $5,8,11,14,\dots$ and the 20th term.`,R`Difference 3, so $3n+2$. 20th term: $3\times20+2=62$`]])],
9:[E("Angles",R`Know the angle facts and give a reason with every step.`,
 [R`\text{angles on a straight line}=180^\circ`,R`\text{angles at a point}=360^\circ`,R`\text{triangle}=180^\circ,\ \ \text{quadrilateral}=360^\circ`],
 R`- Vertically opposite angles are equal
- Write the angle fact next to each calculation
- An isosceles triangle has two equal angles`,
 [[R`Two angles of a triangle are $50^\circ$ and $60^\circ$. Find the third.`,R`$180-50-60=70^\circ$ (angles in a triangle sum to $180^\circ$)`],[R`Angles on a straight line are $x$ and $115^\circ$. Find $x$.`,R`$x=180-115=65^\circ$`]])],
10:[E("Area and perimeter",R`Perimeter is the distance around a shape. Area is the surface inside, measured in square units.`,
 [R`A_{\text{rectangle}}=lw`,R`A_{\text{triangle}}=\dfrac12bh`,R`A_{\text{trapezium}}=\dfrac12(a+b)h`,R`P_{\text{rectangle}}=2(l+w)`],
 R`- The height of a triangle is perpendicular to the base
- Split compound shapes into rectangles and triangles
- Area units are squared (cm²), perimeter units are not`,
 [[R`A triangle has base 10 cm and height 6 cm. Find its area.`,R`$\dfrac12\times10\times6=30$ cm²`],[R`A rectangle has perimeter 26 cm and length 8 cm. Find its width.`,R`$l+w=13$, so $w=13-8=5$ cm`]])],
11:[E("Volume, measures and time",R`Volume is the space inside a 3D shape. Convert units by multiplying or dividing by the conversion factor. Time uses 60 minutes in an hour.`,
 [R`V_{\text{cuboid}}=l\times w\times h`,R`1\ \text{L}=1000\ \text{mL},\ \ 1\ \text{cm}^3=1\ \text{mL}`,R`1\ \text{m}=100\ \text{cm},\ \ 1\ \text{kg}=1000\ \text{g}`],
 R`- Changing to a smaller unit → bigger number (multiply)
- For time, add minutes to the next hour first
- Make sure all lengths are in the same unit before calculating`,
 [[R`Find the volume of a cuboid $5\times4\times3$ cm.`,R`$5\times4\times3=60$ cm³`],[R`A train leaves at 08:50 and the journey takes 2 h 35 min. When does it arrive?`,R`08:50 + 2 h = 10:50, + 35 min = $11:25$`]])],
12:[E("Statistics",R`Averages describe the middle of data; the range describes how spread out it is.`,
 [R`\text{mean}=\dfrac{\text{sum of values}}{\text{number of values}}`,R`\text{range}=\text{largest}-\text{smallest}`,R`\text{median}=\text{middle value (ordered list)}`],
 R`- Order the data before finding the median
- The mode is the most common value (there can be more than one)
- Read bar charts and pictograms carefully: check the scale and key`,
 [[R`Data: 4, 7, 7, 9, 13. Find the mean, median, mode and range.`,R`Mean $=40\div5=8$, median $=7$, mode $=7$, range $=13-4=9$`]])],
13:[E("Probability",R`Probability measures how likely an event is, from 0 (impossible) to 1 (certain). Write it as a fraction, decimal or percentage.`,
 [R`P(\text{event})=\dfrac{\text{number of favourable outcomes}}{\text{total number of outcomes}}`,R`P(\text{not }A)=1-P(A)`],
 R`- List all outcomes in an organised way (a table or list)
- Simplify fractions
- Probabilities of all outcomes add up to 1`,
 [[R`A bag has 3 red and 5 blue counters. Find $P(\text{red})$ and $P(\text{not red})$.`,R`$P(\text{red})=\dfrac38$, $P(\text{not red})=1-\dfrac38=\dfrac58$`]])],
31:[CP("Number",[R`\text{x\% of }N=\dfrac x{100}\times N`,R`\dfrac ab+\dfrac cd=\dfrac{ad+bc}{bd}`],[[R`Work out $\dfrac35$ of 250, then increase it by 10%.`,R`$\dfrac35\times250=150$; $150\times1.1=165$`]])],
32:[CP("Calculation and ratio",[R`\text{one part}=\dfrac{\text{total}}{a+b}`,R`\text{BIDMAS}`],[[R`Share 84 dollars in the ratio $3:4$.`,R`7 parts, 1 part $=12$; shares $36$ and $48$ dollars`]])],
33:[CP("Geometry and measures",[R`A=\dfrac12bh,\ \ V=lwh`,R`\text{angles in a triangle}=180^\circ`],[[R`A right-angled triangle has short sides 6 cm and 8 cm and hypotenuse 10 cm. Find its perimeter.`,R`$6+8+10=24$ cm`]])],
34:[CP("Statistics and probability",[R`\text{mean}=\dfrac{\text{sum}}{\text{count}}`,R`P(\text{not }A)=1-P(A)`],[[R`The mean of 5 numbers is 8. Four of them are 6, 7, 9, 10. Find the fifth.`,R`Total $=40$; $6+7+9+10=32$; fifth number $=8$`]])]
};

var G107={
1:[E("Integers, powers and roots",R`A square number is $n\times n$ and a cube number is $n\times n\times n$. A square root reverses squaring.
Be careful with negatives: $(-3)^2=9$ but $-3^2=-9$.`,
 [R`n^2=n\times n,\ \ n^3=n\times n\times n`,R`\sqrt{n^2}=n,\ \ \sqrt[3]{n^3}=n`],
 R`- Learn squares to 15² and cubes to 5³
- Powers before multiplication (BIDMAS)
- Use prime factors to find roots of large numbers`,
 [[R`Work out $\sqrt{81}+4^3$.`,R`$9+64=73$`],[R`Work out $(-3)^2$ and $-3^2$.`,R`$(-3)^2=9$, $-3^2=-9$`]])],
2:[E("Place value, decimals and rounding",R`Multiplying by 10 moves digits one place left; dividing moves them right. Round to a given number of decimal places or significant figures (s.f.). Significant figures start at the first non-zero digit.`,
 [R`\times10^n:\ \text{digits move }n\text{ places left}`,R`0.0472\approx0.047\ (2\text{ s.f.})`],
 R`- To multiply decimals, ignore the points, multiply, then place the point (count decimal places)
- Leading zeros are not significant; zeros between digits are
- Estimate by rounding to 1 s.f.`,
 [[R`Round 0.0472 to 2 significant figures.`,R`First s.f. is 4, second is 7; next digit is 2, so $0.047$`],[R`Work out $3.6\times0.4$.`,R`$36\times4=144$; two decimal places in total, so $1.44$`]])],
3:[E("Fractions",R`Convert mixed numbers to improper fractions before multiplying or dividing. Add and subtract using a common denominator.`,
 [R`a\dfrac bc=\dfrac{ac+b}c`,R`\dfrac ab\div\dfrac cd=\dfrac ab\times\dfrac dc`],
 R`- Use the LCM of the denominators
- Write the final answer as a mixed number if the question uses them
- "Of" means multiply`,
 [[R`Work out $2\dfrac13+1\dfrac34$.`,R`$\dfrac73+\dfrac74=\dfrac{28}{12}+\dfrac{21}{12}=\dfrac{49}{12}=4\dfrac1{12}$`]])],
4:[E("Percentages",R`Use a multiplier for percentage increase and decrease. Percentage change compares the change with the original value.`,
 [R`\text{new}=\text{old}\times\left(1\pm\dfrac p{100}\right)`,R`\%\text{ change}=\dfrac{\text{change}}{\text{original}}\times100`],
 R`- Increase 15% → multiplier 1.15; decrease 15% → multiplier 0.85
- Always divide by the original value
- Check that the answer is bigger for an increase and smaller for a decrease`,
 [[R`Increase 80 by 15%.`,R`$80\times1.15=92$`],[R`A price falls from 50 to 42. Find the percentage decrease.`,R`$\dfrac{8}{50}\times100=16\%$`]])],
5:[E("Expressions",R`Simplify by collecting like terms. Expand a bracket by multiplying every term inside. Factorising is the reverse: take out the highest common factor.`,
 [R`a(b+c)=ab+ac`,R`x^a\times x^b=x^{a+b}`,R`6x+9=3(2x+3)`],
 R`- Collect like terms: $3x$ and $5x$, but not $3x$ and $3x^2$
- Multiply the sign with the number: $-2(x-4)=-2x+8$
- Check factorising by expanding back`,
 [[R`Expand and simplify $3(2x-5)+4x$.`,R`$6x-15+4x=10x-15$`],[R`Factorise $6x+9$.`,R`HCF is 3: $3(2x+3)$`]])],
6:[E("Equations",R`Solve an equation by doing the same operation to both sides until the unknown is alone.`,
 [R`ax+b=c\ \Rightarrow\ x=\dfrac{c-b}a`,R`\text{balance: same operation on both sides}`],
 R`- Undo addition/subtraction first, then multiplication/division
- With brackets: expand first (or divide both sides by the bracket's multiplier)
- Substitute your answer back to check`,
 [[R`Solve $3x+5=20$.`,R`$3x=15$, $x=5$`],[R`Solve $2(x-3)=14$.`,R`$x-3=7$, $x=10$`]])],
7:[E("Sequences and functions",R`A linear sequence goes up or down by a constant difference. A function machine applies steps to an input to give an output; the rule can be written as $y=mx+c$.`,
 [R`n\text{th term}=dn+(a-d)`,R`y=mx+c`],
 R`- The common difference is the coefficient of n
- To find an input, work backwards through the machine using inverse operations
- Check by putting n = 1 and n = 2 into your rule`,
 [[R`Find the nth term of $7,11,15,19,\dots$ and the 10th term.`,R`Difference 4, so $4n+3$. 10th term: $4\times10+3=43$`],[R`A function machine does "×3, then −2". Input 5. Find the output.`,R`$5\times3=15$, $15-2=13$`]])],
8:[E("Ratio and proportion",R`Ratios compare parts; proportion links two quantities that change together. In direct proportion, doubling one doubles the other.`,
 [R`y=kx\ \ (\text{direct proportion})`,R`\text{one part}=\dfrac{\text{total}}{\text{sum of parts}}`],
 R`- Use the unitary method: value of 1, then multiply
- Convert units before comparing
- Check that the parts add up to the whole`,
 [[R`Share 40 in the ratio $3:5$.`,R`8 parts, 1 part $=5$; $15$ and $25$`],[R`5 books cost 35 dollars. Find the cost of 8 books.`,R`1 book $=7$ dollars, 8 books $=56$ dollars`]])],
9:[E("Angles and triangles",R`Use angle facts and give a reason for each step. Parallel lines create equal angles: corresponding (F shape), alternate (Z shape); co-interior angles add to $180^\circ$.`,
 [R`\text{angles in a triangle}=180^\circ`,R`\text{exterior angle}=\text{sum of the two opposite interior angles}`,R`\text{isosceles: base angles equal}`],
 R`- Mark equal angles on the diagram
- In an isosceles triangle, subtract the apex angle from 180 and halve
- Write reasons in words: "alternate angles"`,
 [[R`An isosceles triangle has apex angle $40^\circ$. Find each base angle.`,R`$(180-40)\div2=70^\circ$`]])],
10:[E("Area and perimeter",R`The circumference is the perimeter of a circle. Give answers in terms of $\pi$ or rounded as asked.`,
 [R`A_{\text{circle}}=\pi r^2`,R`C=2\pi r=\pi d`,R`A_{\text{parallelogram}}=bh`],
 R`- Radius is half the diameter
- For compound shapes, add or subtract simple areas
- Use the π button for decimals and say how you rounded`,
 [[R`A circle has radius 5 cm. Find its area and circumference.`,R`$A=25\pi\approx78.5$ cm²; $C=10\pi\approx31.4$ cm`]])],
11:[E("Coordinates and transformations",R`Transformations move shapes: translation (slide), reflection (mirror), rotation (turn). Describe each fully.`,
 [R`\text{midpoint}=\left(\dfrac{x_1+x_2}2,\dfrac{y_1+y_2}2\right)`,R`\text{reflection in the }y\text{-axis: }(x,y)\to(-x,y)`,R`\text{translation }\begin{pmatrix}a\\b\end{pmatrix}:\ (x,y)\to(x+a,y+b)`],
 R`- Reflection: give the mirror line; rotation: centre, angle and direction; translation: the vector
- Plot points carefully: x first (across), then y (up)
- Check: reflected points are the same distance from the mirror line`,
 [[R`Find the midpoint of $(2,3)$ and $(8,7)$.`,R`$\left(\dfrac{2+8}2,\dfrac{3+7}2\right)=(5,5)$`],[R`Reflect $(3,-2)$ in the y-axis.`,R`$(-3,-2)$`]])],
12:[E("Statistics",R`Summarise data with averages and the range, and display it clearly. For a grouped table use midpoints (later stages) or work with the exact values.`,
 [R`\text{mean}=\dfrac{\sum x}n`,R`\text{median position}=\dfrac{n+1}2`,R`\text{mean from a table}=\dfrac{\sum fx}{\sum f}`],
 R`- Order data first
- For a frequency table multiply x by f before adding
- Label axes and give a title on charts`,
 [[R`Find the mean and median of $2,5,6,8,9$.`,R`Mean $=30\div5=6$; median (3rd value) $=6$`]])],
13:[E("Probability",R`Probabilities lie between 0 and 1. List outcomes in a sample space (a table or list) so none are missed.`,
 [R`0\le P(A)\le1`,R`P(A)+P(\text{not }A)=1`,R`\text{sum of all probabilities}=1`],
 R`- A table is the safest way to list outcomes of two events
- Use fractions in simplest form
- Relative frequency = number of times / number of trials`,
 [[R`A fair die is rolled. Find $P(\text{prime})$.`,R`Primes: 2, 3, 5 so $\dfrac36=\dfrac12$`],[R`A spinner has probabilities $0.2,\,0.3,\,x,\,0.1$. Find $x$.`,R`$x=1-0.2-0.3-0.1=0.4$`]])],
31:[CP("Number",[R`\text{new}=\text{old}\times\left(1\pm\dfrac p{100}\right)`,R`\sqrt{n^2}=n`],[[R`A price of 80 dollars is increased by 15%. Find the new price.`,R`$80\times1.15=92$ dollars`]])],
32:[CP("Algebra",[R`a(b+c)=ab+ac`,R`ax+b=c\Rightarrow x=\dfrac{c-b}a`],[[R`Solve $3(x-2)=2x+5$.`,R`$3x-6=2x+5$, so $x=11$`]])],
33:[CP("Geometry and measures",[R`C=2\pi r,\ \ A=\pi r^2`,R`\text{angles in a triangle}=180^\circ`],[[R`A circle has diameter 10 cm. Find its circumference in terms of $\pi$.`,R`$C=\pi d=10\pi$ cm`]])],
34:[CP("Statistics and probability",[R`\text{mean}=\dfrac{\sum fx}{\sum f}`,R`P(A)+P(\text{not }A)=1`],[[R`A fair spinner has 8 equal sections, 3 of them red. Find $P(\text{not red})$.`,R`$1-\dfrac38=\dfrac58$`]])]
};

var G108={
1:[E("Indices and powers",R`Use the laws of indices when the base is the same. A negative power means a reciprocal and any number to the power 0 is 1.`,
 [R`a^m\times a^n=a^{m+n},\ \ a^m\div a^n=a^{m-n}`,R`(a^m)^n=a^{mn},\ \ a^0=1`,R`a^{-n}=\dfrac1{a^n}`],
 R`- The base must be the same before adding or subtracting powers
- Write each step: do not combine laws in your head
- Negative power → flip the fraction, make the power positive`,
 [[R`Work out $2^5\times2^{-2}$.`,R`$2^{5-2}=2^3=8$`],[R`Simplify $\dfrac{(3^2)^3}{3^4}$.`,R`$\dfrac{3^6}{3^4}=3^2=9$`]])],
2:[E("Fractions and decimals",R`Add and subtract fractions with a common denominator; multiply and divide as in earlier stages. Some decimals repeat forever and equal a fraction.`,
 [R`\dfrac ab-\dfrac cd=\dfrac{ad-bc}{bd}`,R`0.\dot3=\dfrac13,\ \ 0.\dot6=\dfrac23`,R`\text{terminating decimal}\Leftrightarrow\text{denominator has only factors }2,5`],
 R`- Use the lowest common multiple to keep numbers small
- Convert a recurring decimal by dividing the digit by 9
- Check by estimating with decimals`,
 [[R`Work out $\dfrac56-\dfrac38$.`,R`$\dfrac{20}{24}-\dfrac9{24}=\dfrac{11}{24}$`],[R`Write $0.\dot6$ as a fraction.`,R`$\dfrac69=\dfrac23$`]])],
3:[E("Percentages",R`For reverse percentages divide by the multiplier. For repeated change multiply by the multiplier each time.`,
 [R`\text{original}=\dfrac{\text{new}}{\text{multiplier}}`,R`I=\dfrac{PRT}{100}`,R`A=P\left(1+\dfrac r{100}\right)^n`],
 R`- A 20% increase has multiplier 1.2: divide the new price by 1.2 to get the original
- Do not subtract 20% from the new price
- Compound interest earns interest on interest`,
 [[R`After a 20% increase a price is 90 dollars. Find the original price.`,R`$90\div1.2=75$ dollars`],[R`1000 dollars is invested at 5% compound interest for 2 years. Find the total.`,R`$1000\times1.05^2=1102.50$ dollars`]])],
4:[E("Expressions",R`Expand double brackets by multiplying every term in the first bracket by every term in the second. Factorise quadratics and the difference of two squares.`,
 [R`(x+a)(x+b)=x^2+(a+b)x+ab`,R`a^2-b^2=(a+b)(a-b)`],
 R`- Use FOIL or a grid: First, Outer, Inner, Last
- For $x^2+bx+c$ find two numbers that multiply to $c$ and add to $b$
- Always check by expanding back`,
 [[R`Expand $(x+3)(x-5)$.`,R`$x^2-5x+3x-15=x^2-2x-15$`],[R`Factorise $x^2-9$.`,R`$(x-3)(x+3)$`]])],
5:[E("Equations and inequalities",R`Equations with the unknown on both sides: collect the x terms on one side. An inequality is solved like an equation, but reverse the sign when multiplying or dividing by a negative.`,
 [R`ax+b=cx+d\Rightarrow(a-c)x=d-b`,R`-kx<m\ \Rightarrow\ x>-\dfrac mk\ \ (k>0)`],
 R`- Move the smaller x term so the coefficient stays positive
- Show an inequality on a number line: open circle for < or >, closed for ≤ or ≥
- Test one value to check an inequality answer`,
 [[R`Solve $5x-7=2x+11$.`,R`$3x=18$, $x=6$`],[R`Solve $-2x<8$.`,R`Divide by $-2$ and reverse the sign: $x>-4$`]])],
6:[E("Sequences",R`Find the nth term of a linear sequence from its common difference. Use it to find any term or to test whether a number is in the sequence.`,
 [R`n\text{th term}=dn+(a-d)`,R`\text{is }N\text{ a term?}\ \ \text{solve }dn+(a-d)=N`],
 R`- A number is in the sequence only if n is a positive whole number
- Decreasing sequences have a negative d
- Check the nth term on the first two terms`,
 [[R`Find the nth term of $5,9,13,17,\dots$ and decide whether 101 is a term.`,R`$4n+1$. $4n+1=101\Rightarrow n=25$, so yes, 101 is the 25th term`]])],
7:[E("Graphs",R`A straight line has equation $y=mx+c$: $m$ is the gradient and $c$ the y-intercept. Parallel lines have the same gradient.`,
 [R`y=mx+c`,R`m=\dfrac{y_2-y_1}{x_2-x_1}`,R`\text{parallel lines: }m_1=m_2`],
 R`- Rise over run: always subtract in the same order
- To plot, find 2–3 points or use the gradient and intercept
- A point is on the line if its coordinates fit the equation`,
 [[R`Find the equation of the line through $(1,3)$ and $(4,12)$.`,R`$m=\dfrac{12-3}{4-1}=3$; $3=3(1)+c\Rightarrow c=0$; $y=3x$`]])],
8:[E("Ratio and proportion",R`In direct proportion both quantities increase together; in inverse proportion one goes up as the other goes down.`,
 [R`y=kx\ \ (\text{direct}),\ \ y=\dfrac kx\ \ (\text{inverse})`,R`\text{speed}=\dfrac{\text{distance}}{\text{time}}`,R`\text{scale }1:n\Rightarrow\text{real}=\text{map}\times n`],
 R`- Find the constant k first
- More workers → fewer days (inverse): total work = workers × days
- Convert units of the scale (cm → km)`,
 [[R`6 workers take 10 days. How long for 4 workers?`,R`Work $=60$ worker-days; $60\div4=15$ days`],[R`A map scale is $1:50000$. A road is 4 cm on the map. Find the real length in km.`,R`$4\times50000=200000$ cm $=2$ km`]])],
9:[E("Angles and polygons",R`The interior angles of a polygon add up to $(n-2)\times180^\circ$. In a regular polygon all sides and angles are equal.`,
 [R`\text{interior sum}=(n-2)\times180^\circ`,R`\text{exterior angle (regular)}=\dfrac{360^\circ}n`,R`\text{interior}+\text{exterior}=180^\circ`],
 R`- Exterior angles of any polygon add to $360^\circ$
- From an exterior angle: $n=360\div\text{exterior}$
- Name the polygon: 5 pentagon, 6 hexagon, 8 octagon`,
 [[R`Find an interior angle of a regular octagon.`,R`Exterior $=360\div8=45^\circ$; interior $=135^\circ$`],[R`A regular polygon has exterior angle $24^\circ$. How many sides?`,R`$360\div24=15$ sides`]])],
10:[E("Circles",R`Arc length and sector area are fractions of the circumference and area.`,
 [R`C=2\pi r,\ \ A=\pi r^2`,R`\text{arc}=\dfrac\theta{360}\times2\pi r`,R`\text{sector area}=\dfrac\theta{360}\times\pi r^2`],
 R`- Decide which fraction of the circle: θ/360
- Leave answers in terms of π when asked
- Radius, not diameter, goes in the formulas`,
 [[R`A sector has radius 6 cm and angle $60^\circ$. Find the arc length and area.`,R`Fraction $\dfrac16$: arc $=\dfrac16\times12\pi=2\pi$ cm; area $=\dfrac16\times36\pi=6\pi$ cm²`]])],
11:[E("Area and volume",R`The volume of a prism = area of cross-section × length. A cylinder is a prism with a circle as cross-section.`,
 [R`V_{\text{prism}}=A_{\text{cross-section}}\times l`,R`V_{\text{cylinder}}=\pi r^2h`,R`V_{\text{pyramid}}=\dfrac13\times\text{base area}\times h`],
 R`- Find the area of the cross-section first
- Keep units consistent (cm³ = mL)
- Surface area = add the areas of every face`,
 [[R`A cylinder has radius 3 cm and height 10 cm. Find its volume.`,R`$\pi\times3^2\times10=90\pi\approx282.7$ cm³`],[R`A triangular prism: triangle base 6 cm, height 4 cm, length 10 cm. Find the volume.`,R`Triangle area $=12$; volume $=12\times10=120$ cm³`]])],
12:[E("Transformations",R`Enlargement changes size by a scale factor from a centre. Lengths are multiplied by $k$ and areas by $k^2$.`,
 [R`\text{lengths}\times k,\ \ \text{areas}\times k^2,\ \ \text{volumes}\times k^3`,R`\text{rotation: centre, angle, direction}`],
 R`- Describe an enlargement with scale factor AND centre
- A scale factor between 0 and 1 makes the shape smaller
- Check by comparing a pair of matching lengths`,
 [[R`A rectangle $2\times5$ is enlarged with scale factor 3. Find the new area.`,R`Old area $=10$; new area $=10\times3^2=90$`]])],
13:[E("Statistics",R`Use a frequency table to find the mean. Use quartiles and the interquartile range (IQR) to describe spread.`,
 [R`\text{mean}=\dfrac{\sum fx}{\sum f}`,R`IQR=Q_3-Q_1`],
 R`- Add a column $f\times x$ to the table
- The IQR ignores extreme values
- Compare two sets with one average and one measure of spread`,
 [[R`x = 1, 2, 3 with frequencies 4, 5, 1. Find the mean.`,R`$\sum fx=4+10+3=17$; $\sum f=10$; mean $=1.7$`]])],
14:[E("Probability",R`For independent events multiply probabilities (AND); for mutually exclusive events add them (OR). Expected frequency = number of trials × probability.`,
 [R`P(A\text{ and }B)=P(A)\times P(B)\ \ (\text{independent})`,R`P(A\text{ or }B)=P(A)+P(B)\ \ (\text{mutually exclusive})`,R`\text{expected}=n\times P`],
 R`- AND → multiply, OR → add
- Draw a tree diagram if there are two or more stages
- Probability never exceeds 1`,
 [[R`Two fair coins are tossed. Find $P(\text{both heads})$.`,R`$\dfrac12\times\dfrac12=\dfrac14$`],[R`The probability of rain is 0.3. How many rainy days are expected in 200 days?`,R`$200\times0.3=60$`]])],
31:[CP("Number",[R`a^m\times a^n=a^{m+n}`,R`\text{original}=\dfrac{\text{new}}{\text{multiplier}}`],[[R`After a 20% increase a price is 90 dollars. Find the original price.`,R`$90\div1.2=75$ dollars`]])],
32:[CP("Algebra",[R`(x+a)(x+b)=x^2+(a+b)x+ab`,R`y=mx+c`],[[R`Solve $5x-7=2x+11$.`,R`$3x=18$, $x=6$`]])],
33:[CP("Geometry and measures",[R`\text{interior sum}=(n-2)\times180^\circ`,R`V_{\text{prism}}=A\times l`],[[R`Find the interior angle of a regular hexagon.`,R`Exterior $=360\div6=60^\circ$; interior $=120^\circ$`]])],
34:[CP("Statistics and probability",[R`\text{mean}=\dfrac{\sum fx}{\sum f}`,R`P(A\text{ and }B)=P(A)P(B)`],[[R`A fair coin is tossed twice. Find $P(\text{two tails})$.`,R`$\dfrac12\times\dfrac12=\dfrac14$`]])]
};

var G109={
1:[E("Indices and standard form",R`Standard form writes a number as $a\times10^n$ with $1\le a<10$. Use the laws of indices to multiply and divide. Fractional powers mean roots.`,
 [R`a\times10^n,\ \ 1\le a<10`,R`(a\times10^m)(b\times10^n)=ab\times10^{m+n}`,R`a^{1/2}=\sqrt a,\ \ a^{-n}=\dfrac1{a^n}`],
 R`- Big numbers have positive n; numbers below 1 have negative n
- After multiplying, check that the front number is still between 1 and 10
- Use the calculator EXP key for standard form`,
 [[R`Work out $(3\times10^4)(2\times10^5)$.`,R`$6\times10^{9}$`],[R`Write 0.00045 in standard form.`,R`$4.5\times10^{-4}$`]])],
2:[E("Fractions, decimals and rounding",R`Round to decimal places or significant figures and estimate before calculating. Recurring decimals can be written as fractions.`,
 [R`\text{estimate: round each number to 1 s.f.}`,R`0.\dot7=\dfrac79,\ \ 0.\dot1\dot2=\dfrac{12}{99}`],
 R`- Estimate to check calculator answers
- Do not round until the final step
- Use bounds: a value rounded to the nearest 10 lies within ±5`,
 [[R`Estimate $\dfrac{4.87\times19.6}{0.52}$.`,R`$\dfrac{5\times20}{0.5}=200$`],[R`Write $0.\dot7$ as a fraction.`,R`$\dfrac79$`]])],
3:[E("Percentages",R`Use multipliers for repeated change and compound interest. For reverse percentages divide by the multiplier.`,
 [R`A=P\left(1+\dfrac r{100}\right)^n`,R`\text{multiplier}=1\pm\dfrac r{100}`,R`\text{original}=\dfrac{\text{final}}{\text{multiplier}^n}`],
 R`- Depreciation uses a multiplier less than 1: 15% loss → 0.85
- n is the number of years (or periods)
- Do not add percentages from different starting values`,
 [[R`A car worth 12000 dollars loses 15% of its value each year. Find its value after 2 years.`,R`$12000\times0.85^2=8670$ dollars`]])],
4:[E("Expressions and formulae",R`Expand and factorise using identities. To change the subject of a formula, undo the operations in reverse order.`,
 [R`(a+b)^2=a^2+2ab+b^2`,R`a^2-b^2=(a+b)(a-b)`,R`y=ax+b\Rightarrow x=\dfrac{y-b}a`],
 R`- $(a+b)^2$ is NOT $a^2+b^2$
- Do the same to both sides when rearranging
- Collect the new subject on one side, then factorise if needed`,
 [[R`Make $x$ the subject of $y=3x+5$.`,R`$x=\dfrac{y-5}3$`],[R`Expand $(2x+3)^2$.`,R`$4x^2+12x+9$`]])],
5:[E("Equations and inequalities",R`Solve quadratics by factorising and solve simultaneous equations by elimination or substitution.`,
 [R`x^2+bx+c=(x+p)(x+q),\ \ pq=c,\ p+q=b`,R`\text{elimination: make one coefficient equal, then add or subtract}`],
 R`- Set quadratic equal to 0 before factorising
- After finding one variable, substitute back to find the other
- Check the solution in BOTH equations`,
 [[R`Solve $x^2-5x+6=0$.`,R`$(x-2)(x-3)=0$, so $x=2$ or $x=3$`],[R`Solve $2x+y=7$ and $x-y=2$.`,R`Add: $3x=9$, $x=3$; then $y=1$. Check: $6+1=7$, $3-1=2$`]])],
6:[E("Sequences",R`Quadratic sequences have a constant second difference. If the second difference is $2a$, the nth term starts $an^2$.`,
 [R`u_n=an^2+bn+c,\ \ \text{second difference}=2a`,R`\text{geometric: }u_n=ar^{n-1}`],
 R`- Find first differences, then second differences
- Subtract $an^2$ from the sequence to leave a linear part
- Check with the first two terms`,
 [[R`Find the nth term of $2,5,10,17,26,\dots$.`,R`First differences 3, 5, 7, 9; second difference 2, so $a=1$. Subtract $n^2$: $1,1,1,\dots$ so nth term $=n^2+1$`]])],
7:[E("Straight-line graphs",R`Use $y-y_1=m(x-x_1)$ to find an equation from a point and a gradient. Perpendicular lines have gradients that multiply to $-1$.`,
 [R`y-y_1=m(x-x_1)`,R`m_1m_2=-1\ \ (\text{perpendicular})`,R`m_1=m_2\ \ (\text{parallel})`],
 R`- Rearrange to $y=mx+c$ to read the gradient
- Perpendicular gradient: flip the fraction and change the sign
- Check that the point fits your final equation`,
 [[R`Find the line perpendicular to $y=2x+1$ through $(4,3)$.`,R`$m=-\dfrac12$; $y-3=-\dfrac12(x-4)$, so $y=-\dfrac12x+5$`]])],
8:[E("Angles and polygons",R`Use angle rules for parallel lines and polygons, and give a reason for each step.`,
 [R`\text{interior sum}=(n-2)\times180^\circ`,R`\text{co-interior angles}=180^\circ`,R`\text{exterior (regular)}=\dfrac{360^\circ}n`],
 R`- Draw extra lines (parallel) if the diagram is stuck
- Use "alternate", "corresponding", "co-interior" in reasons
- Regular polygon: find the exterior angle first`,
 [[R`A regular polygon has interior angle $156^\circ$. How many sides?`,R`Exterior $=24^\circ$; $n=360\div24=15$`]])],
9:[E("Pythagoras' theorem",R`In a right-angled triangle the square of the hypotenuse (longest side) equals the sum of the squares of the other two sides.`,
 [R`a^2+b^2=c^2`,R`d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}`],
 R`- Finding the hypotenuse: add the squares; finding a short side: subtract
- If $a^2+b^2=c^2$ the triangle is right-angled (converse)
- Common triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25`,
 [[R`Find the hypotenuse of a right-angled triangle with short sides 5 and 12.`,R`$\sqrt{25+144}=13$`],[R`Find the distance between $(1,2)$ and $(7,10)$.`,R`$\sqrt{6^2+8^2}=10$`]])],
10:[E("Circles, area and volume",R`Surface areas and volumes of spheres and cones use $\pi$. Always check which measurement is given (radius or diameter).`,
 [R`V_{\text{sphere}}=\dfrac43\pi r^3,\ \ A=4\pi r^2`,R`V_{\text{cone}}=\dfrac13\pi r^2h`,R`V_{\text{cylinder}}=\pi r^2h`],
 R`- Leave answers in terms of π unless asked to round
- The height of a cone is the vertical height (not the slant)
- Use Pythagoras to find a missing height`,
 [[R`Find the volume of a sphere of radius 3 cm.`,R`$\dfrac43\pi\times27=36\pi$ cm³`],[R`A cone has radius 3 cm and height 4 cm. Find its volume.`,R`$\dfrac13\pi\times9\times4=12\pi$ cm³`]])],
11:[E("Transformations, bearings and scale",R`A bearing is an angle measured clockwise from north, written with three figures. Scale drawings use a ratio to link map and real lengths.`,
 [R`\text{back bearing}=\theta\pm180^\circ`,R`\text{real}=\text{map}\times n\ \ (\text{scale }1:n)`],
 R`- Draw the north line at the starting point first
- Back bearing: add 180 if the bearing is under 180, otherwise subtract
- Convert cm to m or km after multiplying by the scale`,
 [[R`Find the back bearing of $065^\circ$.`,R`$065+180=245^\circ$`],[R`Scale $1:25000$. A path is 6 cm on the map. Find its real length in km.`,R`$6\times25000=150000$ cm $=1.5$ km`]])],
12:[E("Averages and spread",R`For grouped data use the midpoint of each class to estimate the mean. The IQR measures the spread of the middle half of the data.`,
 [R`\text{estimated mean}=\dfrac{\sum f\times\text{midpoint}}{\sum f}`,R`IQR=Q_3-Q_1`],
 R`- Add a midpoint column and an $f\times$ midpoint column
- The estimate of a grouped mean is never exact
- Quote an average with a measure of spread`,
 [[R`Class 0–10 has frequency 4 and class 10–20 has frequency 6. Estimate the mean.`,R`Midpoints 5 and 15: $\dfrac{4\times5+6\times15}{10}=\dfrac{110}{10}=11$`]])],
13:[E("Probability",R`For events that depend on each other (no replacement) the second probability changes. Use a tree diagram and multiply along the branches.`,
 [R`P(A\text{ then }B)=P(A)\times P(B\mid A)`,R`P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)`],
 R`- After taking an item without replacement, reduce both the top and the bottom
- Add the probabilities of different successful routes
- Probabilities along the branches from one point add up to 1`,
 [[R`A bag has 4 red and 6 blue counters. Two are taken without replacement. Find $P(\text{both red})$.`,R`$\dfrac4{10}\times\dfrac39=\dfrac{12}{90}=\dfrac2{15}$`]])],
31:[CP("Number",[R`a\times10^n,\ 1\le a<10`,R`A=P\left(1+\dfrac r{100}\right)^n`],[[R`Write $6\times10^9\div(2\times10^4)$ in standard form.`,R`$3\times10^5$`]])],
32:[CP("Algebra",[R`(a+b)^2=a^2+2ab+b^2`,R`y-y_1=m(x-x_1)`],[[R`Factorise $x^2-5x+6$.`,R`$(x-2)(x-3)$`]])],
33:[CP("Geometry and measures",[R`a^2+b^2=c^2`,R`V_{\text{sphere}}=\dfrac43\pi r^3`],[[R`A right-angled triangle has hypotenuse 13 cm and one short side 5 cm. Find the other short side.`,R`$\sqrt{169-25}=12$ cm`]])],
34:[CP("Statistics and probability",[R`\text{estimated mean}=\dfrac{\sum f\times\text{midpoint}}{\sum f}`,R`P(A\text{ then }B)=P(A)\times P(B\mid A)`],[[R`Two cards are taken from 5 red and 5 blue without replacement. Find $P(\text{both red})$.`,R`$\dfrac5{10}\times\dfrac49=\dfrac29$`]])]
};

/* ---- Stage 10–12 (IGCSE 0580 · Extended · AS Pure 1) ---- */
function CX(area,f,ex,extra){var o=CP(area,f,ex,extra);o.s=o.s.replace(/^Checkpoint-style papers[^\n]*\n[^\n]*\n/,R`Exam-style papers use short questions (Paper 2) and longer structured questions (Paper 4); a calculator is allowed.
`);return o}
var G110={
1:[E("Standard form and bounds",R`Standard form is $a\times10^n$ with $1\le a<10$. A rounded value lies in a range: its lower bound (LB) and upper bound (UB) are half a unit either side.`,
 [R`a\times10^n,\ \ 1\le a<10`,R`\text{LB}\le x<\text{UB}`,R`\text{LB}=x-\tfrac12\text{ unit},\ \ \text{UB}=x+\tfrac12\text{ unit}`],
 R`- For a product or sum, UB uses both upper bounds; LB uses both lower bounds
- For a difference or quotient, mix: UB of a ÷ LB of b
- Give the error interval with ≤ on the left and < on the right`,
 [[R`A length is 12 cm, correct to the nearest cm. Give the bounds.`,R`$11.5\le l<12.5$`],[R`A rectangle is 8 cm by 5 cm, each to the nearest cm. Find the upper bound of its area.`,R`$8.5\times5.5=46.75$ cm²`],[R`Work out $(4\times10^3)(5\times10^5)$.`,R`$20\times10^8=2\times10^9$`]])],
2:[E("Ratio, proportion and rates",R`Speed, density and other rates link two quantities. Direct and inverse proportion can involve powers: $y\propto x^2$ means $y=kx^2$.`,
 [R`\text{speed}=\dfrac{\text{distance}}{\text{time}},\ \ \text{density}=\dfrac{\text{mass}}{\text{volume}}`,R`y\propto x^n\Rightarrow y=kx^n,\ \ y\propto\dfrac1x\Rightarrow y=\dfrac kx`],
 R`- Convert minutes to hours (÷60) before using speed in km/h
- Find k from the first pair of values, then use it
- Average speed = total distance ÷ total time`,
 [[R`A car travels 240 km in 3 h 20 min. Find its average speed.`,R`$3\text{ h }20\text{ min}=\dfrac{10}{3}$ h; $240\div\dfrac{10}3=72$ km/h`],[R`$y\propto x^2$ and $y=18$ when $x=3$. Find $y$ when $x=5$.`,R`$k=\dfrac{18}9=2$; $y=2\times25=50$`]])],
3:[E("Percentages and interest",R`Use multipliers for repeated percentage change. Simple interest is calculated on the original sum only; compound interest on the growing balance.`,
 [R`I=\dfrac{PRT}{100}`,R`A=P\left(1+\dfrac r{100}\right)^n`,R`\text{profit \%}=\dfrac{\text{profit}}{\text{cost}}\times100`],
 R`- Reverse percentage: divide by the multiplier
- Keep full calculator values and round only at the end
- Percentage change always divides by the original`,
 [[R`2000 dollars is invested at 3% compound interest for 4 years. Find the total.`,R`$2000\times1.03^4=2251.02$ dollars`],[R`An item costing 80 dollars is sold for 100 dollars. Find the percentage profit.`,R`$\dfrac{20}{80}\times100=25\%$`]])],
4:[E("Indices and surds",R`Fractional indices mean roots. A surd is an irrational root that cannot be simplified to a whole number. Rationalise a denominator by multiplying top and bottom by the surd.`,
 [R`a^{m/n}=\left(\sqrt[n]a\right)^m`,R`\sqrt a\times\sqrt b=\sqrt{ab}`,R`\dfrac1{\sqrt a}=\dfrac{\sqrt a}a`],
 R`- Take the root first, then the power: $27^{2/3}=3^2$
- Simplify surds with the largest square factor: $\sqrt{50}=\sqrt{25\times2}$
- For $\dfrac1{a+\sqrt b}$ multiply by the conjugate $a-\sqrt b$`,
 [[R`Evaluate $27^{2/3}$.`,R`$\left(\sqrt[3]{27}\right)^2=3^2=9$`],[R`Rationalise $\dfrac6{\sqrt3}$.`,R`$\dfrac{6\sqrt3}3=2\sqrt3$`],[R`Simplify $\sqrt{50}$.`,R`$5\sqrt2$`]])],
5:[E("Algebraic manipulation",R`Factorise fully: take out common factors first, then use the difference of two squares, a quadratic or grouping.`,
 [R`a^2-b^2=(a+b)(a-b)`,R`(a\pm b)^2=a^2\pm2ab+b^2`,R`ax+ay+bx+by=(a+b)(x+y)`],
 R`- Common factor first: $2x^2-8=2(x^2-4)$
- Four terms → try grouping in pairs
- Check by expanding`,
 [[R`Factorise $2x^2-8$.`,R`$2(x^2-4)=2(x-2)(x+2)$`],[R`Factorise $xy+4x+3y+12$.`,R`$x(y+4)+3(y+4)=(x+3)(y+4)$`]])],
6:[E("Equations and quadratics",R`Solve a quadratic by factorising, by the quadratic formula, or by completing the square. The discriminant $b^2-4ac$ tells how many real roots there are.`,
 [R`x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}`,R`x^2+bx=\left(x+\dfrac b2\right)^2-\dfrac{b^2}4`],
 R`- Write the equation as $ax^2+bx+c=0$ first
- Put brackets round negative b and c in the formula
- Give exact answers or the requested accuracy (e.g. 2 d.p.)`,
 [[R`Solve $2x^2+3x-2=0$.`,R`$b^2-4ac=9+16=25$; $x=\dfrac{-3\pm5}4$, so $x=\dfrac12$ or $x=-2$`],[R`Solve $x^2-6x+4=0$ leaving surds.`,R`$x=\dfrac{6\pm\sqrt{20}}2=3\pm\sqrt5$`]])],
7:[E("Simultaneous equations and inequalities",R`Solve a linear and a quadratic equation by substitution. A linear inequality is solved like an equation, reversing the sign when multiplying or dividing by a negative.`,
 [R`\text{substitute }y=mx+c\text{ into the quadratic}`,R`x^2<k^2\Leftrightarrow-k<x<k`],
 R`- Substitute the linear into the quadratic, then solve for x
- Find y for each x using the linear equation
- Show inequalities on a number line`,
 [[R`Solve $y=x+1$ and $x^2+y^2=13$.`,R`$x^2+(x+1)^2=13\Rightarrow x^2+x-6=0$; $x=2,\ y=3$ or $x=-3,\ y=-2$`],[R`Solve $3x-5>7$.`,R`$3x>12$, so $x>4$`]])],
8:[E("Sequences",R`Linear sequences have an nth term $dn+(a-d)$. Quadratic sequences have a constant second difference of $2a$. Geometric sequences multiply by a constant ratio.`,
 [R`u_n=a+(n-1)d`,R`u_n=ar^{n-1}`,R`u_n=an^2+bn+c,\ \ \text{second difference}=2a`],
 R`- Check the nth term with n = 1, 2
- Quadratic: subtract $an^2$, then find the linear part
- A geometric ratio is term ÷ previous term`,
 [[R`Find the nth term of $3,7,11,15,\dots$.`,R`$4n-1$`],[R`Find the 6th term of $2,6,18,\dots$.`,R`$r=3$; $2\times3^5=486$`],[R`Find the nth term of $3,8,15,24,\dots$.`,R`Differences 5, 7, 9; second difference 2 so $a=1$; $n^2+2n$`]])],
9:[E("Functions",R`A function maps each input to one output. Composite $fg(x)$ means "do $g$ first". The inverse $f^{-1}$ undoes $f$: swap $x$ and $y$ and rearrange.`,
 [R`fg(x)=f(g(x))`,R`y=f(x)\Rightarrow x=f^{-1}(y)`,R`f(f^{-1}(x))=x`],
 R`- Work inside out for composites
- For the inverse: write y, swap, rearrange
- Order matters: $fg(x)\ne gf(x)$ in general`,
 [[R`$f(x)=2x+3$, $g(x)=x^2$. Find $fg(x)$, $f^{-1}(x)$ and $gf(1)$.`,R`$fg(x)=2x^2+3$; $f^{-1}(x)=\dfrac{x-3}2$; $f(1)=5$, $gf(1)=25$`]])],
10:[E("Straight lines",R`Find gradients, midpoints and lengths from coordinates, then use them to write equations of lines.`,
 [R`m=\dfrac{y_2-y_1}{x_2-x_1},\ \ y-y_1=m(x-x_1)`,R`M=\left(\dfrac{x_1+x_2}2,\dfrac{y_1+y_2}2\right),\ \ AB=\sqrt{\Delta x^2+\Delta y^2}`,R`m_1m_2=-1\ \ (\text{perpendicular})`],
 R`- Perpendicular gradient: flip and change the sign
- The perpendicular bisector goes through the midpoint
- Check by substituting a known point`,
 [[R`$A(1,2)$, $B(5,10)$. Find the gradient, midpoint and length of $AB$.`,R`$m=\dfrac84=2$; midpoint $(3,6)$; $AB=\sqrt{16+64}=4\sqrt5$`],[R`Find the equation of the perpendicular bisector of $AB$.`,R`$m=-\dfrac12$ through $(3,6)$: $y=-\dfrac12x+7.5$`]])],
11:[E("Mensuration",R`Use the formulas for arcs, sectors, cones, spheres and compound solids. Keep π in the answer when asked for an exact value.`,
 [R`V_{\text{cone}}=\dfrac13\pi r^2h,\ \ \text{curved area}=\pi rl`,R`V_{\text{sphere}}=\dfrac43\pi r^3,\ \ A=4\pi r^2`,R`\text{arc}=\dfrac\theta{360}\times2\pi r`],
 R`- The slant height $l$ comes from Pythagoras: $l^2=r^2+h^2$
- Sector fraction = θ/360
- For compound solids, add or subtract volumes`,
 [[R`A cone has radius 5 cm and height 12 cm. Find the curved area and volume.`,R`$l=13$; curved area $=65\pi$ cm²; $V=\dfrac13\pi\times25\times12=100\pi$ cm³`],[R`A sector has radius 10 cm and angle $72^\circ$. Find the arc length.`,R`$\dfrac{72}{360}\times2\pi\times10=4\pi$ cm`]])],
12:[E("Trigonometry",R`Use SOH CAH TOA in right-angled triangles. For other triangles use the sine rule, cosine rule and the area formula.`,
 [R`\sin\theta=\dfrac{\text{opp}}{\text{hyp}},\ \cos\theta=\dfrac{\text{adj}}{\text{hyp}},\ \tan\theta=\dfrac{\text{opp}}{\text{adj}}`,R`\dfrac a{\sin A}=\dfrac b{\sin B},\ \ a^2=b^2+c^2-2bc\cos A`,R`\text{Area}=\dfrac12ab\sin C`],
 R`- Label hyp, opp, adj from the angle you use
- Sine rule: two sides and two angles involved; cosine rule: SAS or SSS
- Set the calculator to degrees`,
 [[R`A right-angled triangle has hypotenuse 10 cm and an angle of $30^\circ$. Find the opposite side.`,R`$10\sin30^\circ=5$ cm`],[R`Find the area of a triangle with $a=8$, $b=5$ and $C=60^\circ$.`,R`$\dfrac12\times8\times5\times\sin60^\circ=10\sqrt3\approx17.3$ cm²`],[R`Find $a$ if $b=7$, $c=8$, $A=60^\circ$.`,R`$a^2=49+64-56=57$; $a=\sqrt{57}\approx7.55$`]])],
13:[E("Circle theorems",R`Use the circle theorems and always name the one you use.`,
 [R`\text{angle at centre}=2\times\text{angle at circumference}`,R`\text{angle in a semicircle}=90^\circ`,R`\text{opposite angles of a cyclic quadrilateral}=180^\circ`],
 R`- A tangent is perpendicular to the radius at the point of contact
- Two tangents from one point are equal in length
- Alternate segment theorem: angle between tangent and chord = angle in the opposite segment`,
 [[R`The angle at the centre is $110^\circ$. Find the angle at the circumference on the same arc.`,R`$110\div2=55^\circ$`],[R`One angle of a cyclic quadrilateral is $85^\circ$. Find the opposite angle.`,R`$180-85=95^\circ$`]])],
14:[E("Vectors",R`A vector has size and direction. Add and subtract vectors by their components; multiplying by a number scales the vector.`,
 [R`\overrightarrow{AB}=\mathbf b-\mathbf a`,R`|\mathbf a|=\sqrt{x^2+y^2}`,R`\mathbf a=k\mathbf b\Rightarrow\text{parallel}`],
 R`- Subtract "end minus start"
- Parallel vectors are multiples of each other
- To show three points are collinear, show two vectors are parallel and share a point`,
 [[R`Find the magnitude of $\begin{pmatrix}3\\4\end{pmatrix}$.`,R`$\sqrt{9+16}=5$`],[R`$\mathbf a=\begin{pmatrix}1\\2\end{pmatrix}$, $\mathbf b=\begin{pmatrix}3\\-1\end{pmatrix}$. Find $2\mathbf a-\mathbf b$.`,R`$\begin{pmatrix}2-3\\4+1\end{pmatrix}=\begin{pmatrix}-1\\5\end{pmatrix}$`]])],
15:[E("Statistics",R`Estimate the mean of grouped data with class midpoints. In a histogram, the area of a bar shows frequency, so the height is the frequency density.`,
 [R`\text{estimated mean}=\dfrac{\sum f\times\text{midpoint}}{\sum f}`,R`\text{frequency density}=\dfrac{\text{frequency}}{\text{class width}}`,R`\text{median}\leftrightarrow\dfrac n2,\ \ Q_1\leftrightarrow\dfrac n4,\ \ Q_3\leftrightarrow\dfrac{3n}4`],
 R`- On cumulative frequency graphs plot at the upper class boundary
- IQR = Q3 − Q1
- Compare two data sets with an average and the spread`,
 [[R`Classes 0–10, 10–20, 20–40 have frequencies 3, 5, 2. Estimate the mean.`,R`$\dfrac{3\times5+5\times15+2\times30}{10}=\dfrac{150}{10}=15$`],[R`A class 10–30 has frequency 12. Find the frequency density.`,R`$12\div20=0.6$`]])],
16:[E("Probability",R`Multiply along branches of a tree diagram and add the probabilities of different routes. Without replacement, the second probability changes.`,
 [R`P(A\text{ and }B)=P(A)\times P(B)\ \ (\text{independent})`,R`P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)`,R`\text{expected number}=n\times P`],
 R`- Draw the tree and label every branch
- Without replacement: reduce the total on the second branch
- A quicker route: P(at least one) = 1 − P(none)`,
 [[R`A bag has 5 red and 3 green counters. Two are taken without replacement. Find $P(\text{same colour})$.`,R`$\dfrac58\times\dfrac47+\dfrac38\times\dfrac27=\dfrac{20+6}{56}=\dfrac{13}{28}$`]])],
31:[CX("Number",[R`\text{LB}\le x<\text{UB}`,R`A=P\left(1+\dfrac r{100}\right)^n`],[[R`A square has side 6 cm correct to the nearest cm. Find the upper bound of its perimeter.`,R`$4\times6.5=26$ cm`]])],
32:[CX("Algebra",[R`x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}`,R`a^2-b^2=(a+b)(a-b)`],[[R`Solve $x^2-5x-14=0$.`,R`$(x-7)(x+2)=0$, so $x=7$ or $x=-2$`]])],
33:[CX("Geometry and mensuration",[R`\text{arc}=\dfrac\theta{360}\times2\pi r`,R`V_{\text{sphere}}=\dfrac43\pi r^3`],[[R`Find the volume of a sphere of radius 6 cm in terms of $\pi$.`,R`$\dfrac43\pi\times216=288\pi$ cm³`]])],
34:[CX("Trigonometry and vectors",[R`\text{Area}=\dfrac12ab\sin C`,R`a^2=b^2+c^2-2bc\cos A`],[[R`$\overrightarrow{OA}=\begin{pmatrix}2\\1\end{pmatrix}$, $\overrightarrow{OB}=\begin{pmatrix}5\\5\end{pmatrix}$. Find $|\overrightarrow{AB}|$.`,R`$\overrightarrow{AB}=\begin{pmatrix}3\\4\end{pmatrix}$; $|\overrightarrow{AB}|=5$`]])],
35:[CX("Statistics and probability",[R`\text{estimated mean}=\dfrac{\sum fx}{\sum f}`,R`P(A\text{ and }B)=P(A)P(B)`],[[R`A fair die is rolled twice. Find $P(\text{two sixes})$.`,R`$\dfrac16\times\dfrac16=\dfrac1{36}$`]])]
};

var G111={
1:[E("Algebraic fractions and formulae",R`Factorise before cancelling. To add fractions, use a common denominator. To change the subject, collect the subject terms and factorise.`,
 [R`\dfrac ab+\dfrac cd=\dfrac{ad+bc}{bd}`,R`\dfrac{ka}{kb}=\dfrac ab`],
 R`- Cancel factors, never terms: $\dfrac{x+3}{3}\ne x+1$
- Put everything over one denominator, then simplify
- Check by substituting a value for x`,
 [[R`Simplify $\dfrac{x^2-9}{x^2+3x}$.`,R`$\dfrac{(x-3)(x+3)}{x(x+3)}=\dfrac{x-3}x$`],[R`Write $\dfrac1{x+1}+\dfrac2{x-1}$ as one fraction.`,R`$\dfrac{(x-1)+2(x+1)}{(x+1)(x-1)}=\dfrac{3x+1}{x^2-1}$`]])],
2:[E("Quadratics",R`Complete the square to find the turning point. The discriminant decides the nature of the roots: positive → 2 real roots, zero → 1, negative → none.`,
 [R`ax^2+bx+c=a(x-p)^2+q`,R`b^2-4ac>0,\ =0,\ <0`,R`x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}`],
 R`- The minimum of $(x-p)^2+q$ is $q$ at $x=p$
- Equal roots → discriminant = 0
- Sketch the curve using roots, y-intercept and turning point`,
 [[R`Write $x^2+4x+7$ in the form $(x+p)^2+q$ and state the minimum value.`,R`$(x+2)^2+3$; minimum $3$ at $x=-2$`],[R`$x^2+kx+9=0$ has equal roots. Find $k$.`,R`$k^2-36=0$, so $k=\pm6$`]])],
3:[E("Indices and exponential growth",R`Exponential functions have the variable in the power. Equal bases mean equal powers. Growth uses a multiplier greater than 1; decay less than 1.`,
 [R`y=ab^x`,R`a^x=a^y\Rightarrow x=y`,R`P=P_0(1+r)^t`],
 R`- Write both sides with the same base
- Growth of 4% means multiplier 1.04
- Use logs or trial and improvement only if the question allows`,
 [[R`Solve $2^{x+1}=32$.`,R`$2^{x+1}=2^5$, so $x=4$`],[R`A population of 500 grows by 4% each year. Find it after 10 years.`,R`$500\times1.04^{10}\approx740$`]])],
4:[E("Functions",R`Transformations of $y=f(x)$: a number outside moves the graph vertically, a number inside moves it horizontally in the opposite way.`,
 [R`f(x)+a:\ \text{up }a`,R`f(x+a):\ \text{left }a`,R`-f(x):\ \text{reflect in }x\text{-axis},\ \ f(-x):\ \text{reflect in }y\text{-axis}`],
 R`- Inside brackets does the opposite of what you expect
- The domain excludes values that make a denominator 0 or a root negative
- The inverse is a reflection in $y=x$`,
 [[R`State the values of $x$ not in the domain of $f(x)=\dfrac1{x-2}$.`,R`$x\ne2$`],[R`Describe the transformation $f(x)\to f(x+2)$.`,R`Translation by $\begin{pmatrix}-2\\0\end{pmatrix}$`]])],
5:[E("Differentiation",R`The derivative gives the gradient of a curve. Stationary points occur where $\dfrac{dy}{dx}=0$; the second derivative decides if it is a maximum or a minimum.`,
 [R`\dfrac d{dx}\left(ax^n\right)=anx^{n-1}`,R`\text{tangent: }y-y_1=f'(x_1)(x-x_1)`,R`f''(x)>0\Rightarrow\min,\ \ f''(x)<0\Rightarrow\max`],
 R`- Rewrite roots and reciprocals as powers before differentiating
- Normal gradient = $-\dfrac1{\text{tangent gradient}}$
- Substitute back into y to find the coordinates`,
 [[R`Find the stationary points of $y=x^3-6x^2+9x$.`,R`$y'=3(x-1)(x-3)$: $(1,4)$ is a maximum ($y''=-6$) and $(3,0)$ is a minimum ($y''=6$)`],[R`Find the tangent to $y=x^2$ at $x=3$.`,R`Gradient 6, point $(3,9)$: $y=6x-9$`]])],
6:[E("Similarity",R`Similar shapes have the same angles and corresponding sides in the same ratio $k$. Areas scale by $k^2$ and volumes by $k^3$.`,
 [R`\text{length ratio }k:\ \ \text{area}\times k^2,\ \ \text{volume}\times k^3`,R`k=\sqrt{\dfrac{A_2}{A_1}}`],
 R`- Find the length scale factor first
- Convert area ratio → length ratio with a square root
- Convert length ratio → volume ratio with a cube`,
 [[R`Two similar cones have heights 4 cm and 6 cm. The small one has volume 80 cm³. Find the volume of the large one.`,R`$k=1.5$; $80\times1.5^3=270$ cm³`],[R`Two similar shapes have area ratio $9:25$. Find the ratio of lengths.`,R`$3:5$`]])],
7:[E("Trigonometry: graphs, 3D and bearings",R`The graphs of sine, cosine and tangent repeat. $y=a\sin bx$ has amplitude $a$ and period $\dfrac{360^\circ}b$. In 3D, find the right-angled triangle that contains the angle or length you need.`,
 [R`y=a\sin bx:\ \text{period}=\dfrac{360^\circ}b`,R`\tan\theta=\dfrac{\sin\theta}{\cos\theta}`,R`d=\sqrt{l^2+w^2+h^2}`],
 R`- Sketch the graph to find all solutions in the interval
- sin positive in the 1st and 2nd quadrants; cos in the 1st and 4th; tan in the 1st and 3rd
- Bearings are clockwise from north, three figures`,
 [[R`Solve $\sin x=0.5$ for $0^\circ\le x\le360^\circ$.`,R`$x=30^\circ$ or $150^\circ$`],[R`A cuboid is $3\times4\times12$ cm. Find the space diagonal.`,R`$\sqrt{9+16+144}=13$ cm`]])],
8:[E("Vectors in geometry",R`Use position vectors to prove geometric results. The midpoint and ratio points can be written using $\mathbf a$ and $\mathbf b$.`,
 [R`\overrightarrow{AB}=\mathbf b-\mathbf a`,R`\overrightarrow{OM}=\dfrac12(\mathbf a+\mathbf b)\ \ (M\text{ midpoint})`,R`\overrightarrow{OP}=\mathbf a+\dfrac mn(\mathbf b-\mathbf a)\ \ \left(AP=\dfrac mn AB\right)`],
 R`- Find a route from O to the point using known vectors
- Simplify your answer in terms of $\mathbf a$ and $\mathbf b$
- Collinear: vectors are parallel and share a point`,
 [[R`$\overrightarrow{OA}=\mathbf a$, $\overrightarrow{OB}=\mathbf b$. $P$ is on $AB$ with $AP:PB=1:2$. Find $\overrightarrow{OP}$.`,R`$\overrightarrow{AP}=\dfrac13(\mathbf b-\mathbf a)$; $\overrightarrow{OP}=\mathbf a+\dfrac13(\mathbf b-\mathbf a)=\dfrac{2\mathbf a+\mathbf b}3$`]])],
9:[E("Sequences",R`Arithmetic and geometric sums. A geometric series converges when $-1<r<1$ and then has a sum to infinity.`,
 [R`S_n=\dfrac n2\left[2a+(n-1)d\right]`,R`S_n=\dfrac{a(r^n-1)}{r-1}`,R`S_\infty=\dfrac a{1-r}\ \ (|r|<1)`],
 R`- Find a and d (or r) first
- $S_\infty$ only exists if $|r|<1$
- Check the first few terms of your nth term`,
 [[R`Find the sum of the first 20 terms of $5,9,13,\dots$.`,R`$S_{20}=10\left[10+19\times4\right]=860$`],[R`Find the sum to infinity of $8,4,2,\dots$.`,R`$r=\dfrac12$; $S_\infty=\dfrac8{1-0.5}=16$`]])],
10:[E("Statistics: histograms and cumulative frequency",R`Histograms use frequency density so that bar area is proportional to frequency. Cumulative frequency gives the median and quartiles by reading at $\dfrac n2$, $\dfrac n4$ and $\dfrac{3n}4$.`,
 [R`FD=\dfrac{\text{frequency}}{\text{class width}}`,R`IQR=Q_3-Q_1`],
 R`- Frequency = FD × class width
- Plot cumulative frequency at the upper boundary
- The median of 80 values is at 40`,
 [[R`A histogram class has width 5 and frequency 20. Find the frequency density.`,R`$20\div5=4$`]])],
11:[E("Conditional probability",R`Conditional probability is the chance of an event given another has happened.`,
 [R`P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}`,R`P(A)=P(A\cap B)+P(A\cap B')`],
 R`- Draw a tree diagram and label every branch
- Add routes for "or"; multiply along branches for "and"
- "Given that" → divide by the probability of the given event`,
 [[R`$P(\text{rain})=0.3$. If it rains $P(\text{late})=0.5$; otherwise $P(\text{late})=0.1$. Find $P(\text{late})$ and $P(\text{rain}\mid\text{late})$.`,R`$P(\text{late})=0.15+0.07=0.22$; $P(\text{rain}\mid\text{late})=\dfrac{0.15}{0.22}=\dfrac{15}{22}$`]])],
12:[E("Sets and Venn diagrams",R`Use set notation and Venn diagrams. Fill the intersection first, then the rest of each set.`,
 [R`n(A\cup B)=n(A)+n(B)-n(A\cap B)`,R`n(A')=n(\xi)-n(A)`],
 R`- Start from the middle (the intersection) and work outwards
- The total of all regions equals $n(\xi)$
- $A\cap B$ = both; $A\cup B$ = at least one`,
 [[R`30 students: 18 play football, 14 play tennis, 5 play both. How many play neither?`,R`$n(F\cup T)=18+14-5=27$; neither $=30-27=3$`]])],
13:[E("Mensuration",R`Volumes and areas of composite solids: split into hemispheres, cylinders and cones, and add or subtract.`,
 [R`V_{\text{hemisphere}}=\dfrac23\pi r^3`,R`A_{\text{curved hemisphere}}=2\pi r^2`,R`\text{total surface area (solid hemisphere)}=3\pi r^2`],
 R`- Include only the faces that are present
- Use exact π answers when asked
- Convert units before multiplying`,
 [[R`A solid hemisphere has radius 6 cm. Find its volume and total surface area.`,R`$V=\dfrac23\pi\times216=144\pi$ cm³; $A=3\pi\times36=108\pi$ cm²`]])],
31:[CX("Number",[R`P=P_0(1+r)^t`,R`a^{m/n}=\left(\sqrt[n]a\right)^m`],[[R`Evaluate $8^{2/3}$.`,R`$\left(\sqrt[3]8\right)^2=4$`]])],
32:[CX("Algebra",[R`b^2-4ac`,R`\dfrac{d}{dx}(ax^n)=anx^{n-1}`],[[R`Differentiate $y=3x^4-2x$.`,R`$\dfrac{dy}{dx}=12x^3-2$`]])],
33:[CX("Geometry and mensuration",[R`\text{area}\times k^2,\ \ \text{volume}\times k^3`,R`V_{\text{hemisphere}}=\dfrac23\pi r^3`],[[R`Two similar solids have lengths in ratio $2:3$. The smaller has surface area 20 cm². Find the larger's surface area.`,R`$20\times\dfrac94=45$ cm²`]])],
34:[CX("Trigonometry and vectors",[R`y=a\sin bx:\ \text{period}=\dfrac{360^\circ}b`,R`\overrightarrow{AB}=\mathbf b-\mathbf a`],[[R`State the period of $y=\sin3x$.`,R`$\dfrac{360^\circ}3=120^\circ$`]])],
35:[CX("Statistics and probability",[R`P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}`,R`n(A\cup B)=n(A)+n(B)-n(A\cap B)`],[[R`$P(A\cap B)=0.2$ and $P(B)=0.5$. Find $P(A\mid B)$.`,R`$\dfrac{0.2}{0.5}=0.4$`]])]
};

var G112={
1:[E("Quadratics",R`Complete the square, use the discriminant, and link a line with a curve: the number of intersection points is given by the discriminant of the combined equation.`,
 [R`b^2-4ac>0\ (2\text{ roots}),\ =0\ (\text{tangent}),\ <0\ (\text{none})`,R`\alpha+\beta=-\dfrac ba,\ \ \alpha\beta=\dfrac ca`],
 R`- Substitute the line into the curve and form a quadratic
- Tangent → discriminant = 0
- Always show the discriminant calculation`,
 [[R`Write $2x^2-4x+5$ in the form $a(x-p)^2+q$.`,R`$2(x-1)^2+3$`],[R`The line $y=2x+k$ is a tangent to $y=x^2$. Find $k$.`,R`$x^2-2x-k=0$; $4+4k=0$, so $k=-1$`]])],
2:[E("Functions",R`The domain is the set of inputs and the range the set of outputs. A function has an inverse only if it is one-to-one on its domain. The graph of $f^{-1}$ is the reflection of $f$ in $y=x$.`,
 [R`fg(x)=f(g(x))`,R`\text{range of }f=\text{domain of }f^{-1}`],
 R`- Restrict the domain (e.g. x ≥ 1) to make a quadratic one-to-one
- Find the inverse: write y, swap, rearrange
- Use a sketch to find the range`,
 [[R`$f(x)=(x-1)^2+2$ for $x\ge1$. Find the range and $f^{-1}(x)$.`,R`Range: $f(x)\ge2$. $y-2=(x-1)^2\Rightarrow f^{-1}(x)=1+\sqrt{x-2}$`]])],
3:[E("Coordinate geometry",R`A circle with centre $(a,b)$ and radius $r$ has equation $(x-a)^2+(y-b)^2=r^2$. The tangent at a point is perpendicular to the radius.`,
 [R`(x-a)^2+(y-b)^2=r^2`,R`m_{\text{tangent}}=-\dfrac1{m_{\text{radius}}}`,R`\text{midpoint},\ \ \text{distance},\ \ m_1m_2=-1`],
 R`- Complete the square for x and y to find the centre and radius
- Check that the given point lies on the circle
- A chord's perpendicular bisector passes through the centre`,
 [[R`Find the centre and radius of $x^2+y^2-6x+4y-12=0$.`,R`$(x-3)^2+(y+2)^2=25$; centre $(3,-2)$, radius 5`],[R`Find the tangent to this circle at $(6,2)$.`,R`Radius gradient $\dfrac43$; tangent gradient $-\dfrac34$; $y-2=-\dfrac34(x-6)$`]])],
4:[E("Circular measure",R`Radians measure angles by arc length: one radian is the angle where the arc equals the radius. Use radians in the arc and sector formulas.`,
 [R`\pi\text{ rad}=180^\circ`,R`s=r\theta`,R`A=\dfrac12r^2\theta`],
 R`- Degrees → radians: multiply by $\dfrac\pi{180}$
- The formulas only work with θ in radians
- Segment area = sector − triangle ($\dfrac12r^2\sin\theta$)`,
 [[R`A sector has $r=8$ cm and $\theta=0.75$ rad. Find the arc length and area.`,R`$s=8\times0.75=6$ cm; $A=\dfrac12\times64\times0.75=24$ cm²`],[R`Convert $150^\circ$ to radians.`,R`$\dfrac{150\pi}{180}=\dfrac{5\pi}6$`]])],
5:[E("Trigonometry",R`Use exact values and identities. Solve equations in a given interval by finding the principal value and the other solutions from symmetry.`,
 [R`\tan\theta=\dfrac{\sin\theta}{\cos\theta}`,R`\sin^2\theta+\cos^2\theta=1`],
 R`- Sketch the graph to see how many solutions to expect
- Use the identity to turn a mixed equation into one function
- Check the interval: degrees or radians`,
 [[R`Solve $\tan\theta=2$ for $0^\circ\le\theta\le360^\circ$.`,R`$\theta=63.4^\circ$ or $243.4^\circ$`],[R`$\sin\theta=\dfrac35$ with $\theta$ acute. Find $\cos\theta$ and $\tan\theta$.`,R`$\cos\theta=\dfrac45$, $\tan\theta=\dfrac34$`]])],
6:[E("Series",R`The binomial theorem expands $(a+b)^n$. Arithmetic and geometric series have standard sums; a geometric series with $|r|<1$ converges.`,
 [R`(a+b)^n=\sum_{r=0}^{n}\binom nr a^{n-r}b^r`,R`S_n=\dfrac n2\left[2a+(n-1)d\right]`,R`S_\infty=\dfrac a{1-r}`],
 R`- The coefficient includes both the binomial number and the powers of the numbers
- Write out the general term first
- $S_\infty$ needs $|r|<1$`,
 [[R`Find the coefficient of $x^2$ in $(1+2x)^5$.`,R`$\binom52\times2^2=10\times4=40$`],[R`Find the sum to infinity of $12,4,\dfrac43,\dots$.`,R`$r=\dfrac13$; $S_\infty=\dfrac{12}{1-\frac13}=18$`]])],
7:[E("Differentiation",R`Differentiate powers, including with the chain rule. Use $\dfrac{dy}{dx}$ for gradients, tangents and normals, and use $\dfrac{d^2y}{dx^2}$ to classify stationary points and solve optimisation problems.`,
 [R`\dfrac{d}{dx}(ax+b)^n=na(ax+b)^{n-1}`,R`m_{\text{normal}}=-\dfrac1{m_{\text{tangent}}}`,R`\dfrac{d^2y}{dx^2}>0\Rightarrow\min`],
 R`- In optimisation, write one variable in terms of the other first
- Always confirm the max/min with the second derivative
- Give the final answer with the units asked`,
 [[R`Differentiate $y=(2x-1)^3$ and find the gradient at $x=1$.`,R`$\dfrac{dy}{dx}=6(2x-1)^2$; at $x=1$ the gradient is $6$`],[R`A rectangle has perimeter 40 cm. Find its maximum area.`,R`$A=x(20-x)$; $A'=20-2x=0\Rightarrow x=10$; $A=100$ cm²`]])],
8:[E("Integration",R`Integration reverses differentiation. A definite integral gives the area under a curve between two limits; rotating about the x-axis gives a volume of revolution.`,
 [R`\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+c\ \ (n\ne-1)`,R`\int_a^b f(x)\,dx=F(b)-F(a)`,R`V=\pi\int_a^b y^2\,dx`],
 R`- Never forget +c for an indefinite integral
- Area below the x-axis is negative: take care with signs
- Use a point on the curve to find c`,
 [[R`Evaluate $\int_1^3(2x+1)\,dx$.`,R`$\left[x^2+x\right]_1^3=12-2=10$`],[R`The curve $y=\sqrt x$ for $0\le x\le4$ is rotated about the x-axis. Find the volume.`,R`$\pi\int_0^4x\,dx=\pi\left[\dfrac{x^2}2\right]_0^4=8\pi$`]])],
31:[CX("Quadratics and functions",[R`b^2-4ac`,R`f^{-1}:\ \text{swap }x,y`],[[R`Find the range of values of $k$ for which $x^2+4x+k=0$ has real roots.`,R`$16-4k\ge0$, so $k\le4$`]])],
32:[CX("Coordinate geometry and circular measure",[R`(x-a)^2+(y-b)^2=r^2`,R`s=r\theta,\ \ A=\dfrac12r^2\theta`],[[R`A circle has centre $(1,2)$ and radius 3. Write its equation.`,R`$(x-1)^2+(y-2)^2=9$`]])],
33:[CX("Series and trigonometry",[R`S_\infty=\dfrac a{1-r}`,R`\sin^2\theta+\cos^2\theta=1`],[[R`Solve $2\sin\theta=1$ for $0^\circ\le\theta\le360^\circ$.`,R`$\sin\theta=\dfrac12$; $\theta=30^\circ$ or $150^\circ$`]])],
34:[CX("Differentiation and integration",[R`\dfrac{d}{dx}(ax^n)=anx^{n-1}`,R`\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+c`],[[R`Find $\int(6x^2-4x)\,dx$.`,R`$2x^3-2x^2+c$`]])]
};

var D=window.HUBDATA=window.HUBDATA||{};
D["106"]=G106;D["107"]=G107;D["108"]=G108;D["109"]=G109;D["110"]=G110;D["111"]=G111;D["112"]=G112;
})();
