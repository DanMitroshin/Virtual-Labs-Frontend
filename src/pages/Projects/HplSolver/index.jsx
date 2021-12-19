import React from 'react';
import ProjectPattern from "../ProjectPattern";

const title = `### Beeler-Reuter`

const description = `

### Введение

Механическое сокращение сердца обусловлено распространением электрического возбуждения, называемого потенциалом действия (ПД). Последний процесс, в свою очередь, связан с движением ионов через потенциал-зависимые ионные каналы: при деполяризации мембранный потенциал клеток сердца (кардиомиоцитов) в течении нескольких миллисекунд изменяется от значения ~-80 мВ до значения ~+20 мВ; при последующей реполяризации мембранный потенциал относительно медленно уменьшается до исходного значения.  Несмотря на то, что современные, количественно корректные, модели потенциала действия достаточно сложны ([1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002061), [2](https://www.sciencedirect.com/science/article/pii/S0022282809004295?via%3Dihub)), общие принципы формирования потенциала действия могут быть описаны при помощи более простых моделей, таких как модель миоцитов желудочка Beeler-Reuter (1977) ([3](https://physoc.onlinelibrary.wiley.com/doi/10.1113/jphysiol.1977.sp011853)), которая в свою очередь является развитием классической модели Ходжкина-Хаксли ([4](https://physoc.onlinelibrary.wiley.com/doi/10.1113/jphysiol.1952.sp004764)).

Изменение потенциала на клеточной мембране может быть описано уравнением:

$$
\\begin{equation}
\\frac{dV}{dt} = \\frac{1}{C} * \\displaystyle\\sum_{i}I_i
\\end{equation}
$$

где: C - емкость мембраны,  $I_i$ - ионный ток протекающий через клетку.

Каждый из ионных токов описывается при помощи закона Ома: 

$$
\\begin{equation}I_i = G_i* (V - E_i)\\end{equation}
$$

где $G_i$ - проводимость ионного канала, а электродвижущая сила $E_i$- это потенциал реверсии, который обусловлен диффузией ионов по градиенту концентрации (потенциал Нернста). Он определяется по следующей формуле:

$$
\\begin{equation}E_i = \\frac{RT}{nF} * \\ln\\left(\\frac{[i]_{out}}{[i]_{in}}\\right)\\end{equation}
$$

|  | ⁍, ммоль/л | ⁍, ммоль/л | E, мВ |
| --- | --- | --- | --- |
| Ca | 1e-7 | 2 | 212.1 |
| Na | 12 | 145 | 62,9 |
| K | 155 | 4 | -92,3 |

**Табл.1**  Внутри- и внеклеточные концентрации ионов в мышечных клетках теплокровных животных и потенциалы нернста при 20°С.

Как видно из таблицы 1 и формулы (3), в физиологическом диапазоне параметров модели натриевые ($I_{Na}$) и кальциевые ($I{s}$) токи являются деполяризующими (отрицательными), а калиевые ($I_{K1}$, $I_{x1}$) реполяризующими (положительными).

Проводимость ионных каналов вычисляется как произведение максимальной проводимости и воротных переменных: 

$$
\\begin{equation}G_i = g_i * \\prod_{k} x_{i_{k}}^{n_k},\\end{equation}
$$

где $k$ - число воротных переменных , а $n_k$ - степень, полученная из представлений об архитектуре ионного канала. Далее для простоты опустим индексы.

Воротные переменные определяют состояние канала, в котором он находится в данный момент : 

![Screenshot from 2021-12-17 12-43-10.png](https://sun9-41.userapi.com/impg/uzVy3Pi2ZYCb6EntPxEivgRXeeAsJsqPcsAhow/sPjP2PGlAec.jpg?size=169x81&quality=96&sign=7adaf5cc78f28344f51ebcf23efe30b3&type=album)

и описываются уравнениями химической кинетики:

$$
\\begin{equation}\\frac{dx}{dt} = \\alpha_x(V)*(1-x) -\\beta_x(V)*x,\\end{equation}
$$

Их можно переписать как

$$
\\begin{equation}\\frac{dx}{dt} = \\frac{x_{\\infty} - x}{\\tau_{x}}\\end{equation}
$$

где

$$
\\begin{equation}x_\\infty = \\frac{\\alpha_{x}(V)}{\\alpha_{x}(V) + \\beta_{x}(V)}\\end{equation}
$$

$$
\\begin{equation} \\tau_{x} = \\frac{1}{\\alpha_{x}(V) + \\beta_{x}(V)} \\end{equation}
$$

### Численное интегрирование системы ОДУ

Система ОДУ, описывающая динамику мембранного потенциала является жесткой в силу значительных отличий характерных времен активации/инактивации ионных каналов. Так, например, характерное время инактивации натриевого тока составляет несколько миллисекунд в то время как для калиевого тока эта величина ($\\tau_{x1}$)  достигает 600 миллисекунд. Более того, правая часть современных системы ОДУ в современных моделях относительно трудоемка для вычислений. Для решения задач вычислительной кардиологии хорошо зарекомендовали себя многошаговые методы численного интегрирования с адаптивным шагом (см., например, [Cellular cardiac electrophysiology modeling with Chaste and CellML](https://doi.org/10.3389/fphys.2014.00511)).

### Модель Beeler-Reuter

[Reconstruction of the action potential of ventricular myocardial fibres](https://models.physiomeproject.org/e/23a/beeler_reuter_1977.cellml/view)

![beeler_reuter_1977.png](https://sun9-77.userapi.com/impg/zODUdPgDNqzsypOd4dZP4rbIR-Fx65pRuY2roA/zGaweGY-aNo.jpg?size=412x288&quality=96&sign=cbfd6a24b66a20ccfdd9e98f6425f1ea&type=album)

![cellml_rendering.gif](https://sun9-17.userapi.com/impg/KaB2XZ2WkB_pCVQ586RCRDLpkuR_M5jtO6HzTw/5xn6RcnwjqQ.jpg?size=512x350&quality=96&sign=d22003455d4c965dafcc5c137c576176&type=album)

#### Уравнения модели

##### Распространение потенциала действия

$$
\\begin{equation}\\frac{dV}{dt} = \\frac{I_{stim} - (i_{Na} + i_{s} + i_{x1} +i_{K1}) }{C}\\end{equation}
$$

##### Натриевый ток

$$
\\begin{equation}i_{Na} = g_{Na} \\cdot m^3 \\cdot h \\cdot j\\cdot(V - E_{Na})\\end{equation}
$$

$$
\\begin{equation}\\frac{dm}{dt} = \\alpha_m * (1. - m) - \\beta_m * m
\\end{equation}\\\\\\begin{equation}
\\alpha_{m} = \\frac{-(V + 47.0)}{ e^{-0.1 * (V+47.)} - 1}\\end{equation}
\\\\\\begin{equation}
\\beta_m = 40. * e^{-0.056 * (V + 72.)}\\end{equation}
$$

$$
\\begin{equation}\\frac{dh}{dt} = \\alpha_h * (1. - h) - \\beta_h * h
\\end{equation}\\\\\\begin{equation}
\\alpha_h = 0.126 * e^{-0.25 * (V + 77.)}\\end{equation}
\\\\\\begin{equation}
\\beta_h = \\frac{1.7}{1 + e^{-0.082 * (V + 22.5)}}\\end{equation}
$$

$$
\\begin{equation}\\frac{dj}{dt} = \\alpha_j * (1. - j) - \\beta_j * j
\\end{equation}\\\\\\begin{equation}
\\beta_j = \\frac{0.3}{1. + e^{-0.1 * (V + 32.)}}
\\end{equation}\\\\\\begin{equation}
\\alpha_j = \\frac{0.055 * e^{-0.25 * (V + 78.)}}{1. + e^{-0.2 * (V + 78.)}}\\end{equation}
$$

##### Медленный входящий ток

$$
\\begin{equation}
E_s = -82.3 - (13.0287 * ln( 0.001 * Ca_i))\\end{equation}
\\\\\\begin{equation}i_s = g_s * d * f * (V - E_s)\\end{equation}\\\\\\begin{equation}\\frac{dCa_{i}}{dt} = -0.01 * i_s + 0.07 * (0.0001 - Ca_i)\\end{equation}
$$

$$
\\begin{equation}\\alpha_d = \\frac{0.095 * exp{\\frac{-(V - 5.)}{100.}}} {1. + e^{\\frac{-(V - 5.)}{13.89}}}\\end{equation}\\\\\\begin{equation}\\beta_d = \\frac{0.07 * e^{\\frac{-(V + 44.)}{59.}}}{1. + e^{\\frac{V + 44.}{ 20.}}}\\end{equation}\\\\\\begin{equation}\\frac{dd}{dt} = \\alpha_d * (1. - d) - \\beta_d * d\\end{equation}
$$

$$
\\begin{equation}\\alpha_f = \\frac{0.012 * e^{\\frac{-(V + 28.)}{125.}}}{1. + e^{\\frac{V + 28.}{6.67}}}\\end{equation}\\\\\\begin{equation}\\beta_f =\\frac{ 0.0065 * e^{\\frac{-(V + 30.)}{50.}}}{ 1. + e^{\\frac{-(V + 30.)}{5.}}}\\end{equation}\\\\\\begin{equation}\\frac{df}{dt} = \\alpha_f * (1. - f) - \\beta_f * f\\end{equation}
$$

##### Времязависимый входящий ток

$$
\\begin{equation}i_{x_1} = x_1 * 8e^{-3} * \\frac{e^{0.004 * (V + 77.)} - 1.}{e^{0.04 * (V + 35.)}}\\end{equation}
$$

$$
\\begin{equation}\\alpha_{x_1} = \\frac{5e^{-4} * e^{\\frac{V + 50.}{12.1}}}{1. + exp{\\frac{V + 50.}{17.5}}}\\end{equation}\\\\\\begin{equation}\\beta_{x_1} = 0.0013 * e^{\\frac{(-(V + 20.)}{16.67}}{1. + e^{\\frac{-(V + 20.)} {25.}}}\\end{equation}\\\\\\begin{equation}\\frac{dx_1}{dt} = \\alpha_{x_1} * (1. - x_1) - \\beta_{x_1} * x_1\\end{equation}
$$

##### Не зависящий от времени входящий ток

$$
\\begin{equation}i_{K_1} =0.0035 * \\left(\\frac{4. * (e^{0.04 * (V + 85)} - 1)}{e^{0.08 * (V + 53.)} + e^{0.04 * (V + 53.)}}
+ \\frac{0.2 * (V + 23.)}{1 - e^{-0.04 * (V + 23.)}}\\right)\\end{equation}
$$

##### Протокол стимуляции

$$
\\begin{equation}I_{stim} =
\\begin{cases}
n/2 & \\quad \\text{если }
\\begin{cases}
I_{stim_{Start}} \\leq t \\leq I_{stim_{End}} \\\\
t - I_{stim_{Start}} - \\left[\\frac{t - I_{stim_{Start}}}{I_{stim_{Period}}}\\right] * I_{stim_{Period}} \\leq I_{stim_{Pulse Duration}}
\\end{cases}\\\\
0  & \\quad \\text{иначе}
\\end{cases}\\end{equation}
$$

#### Трансмембранный потенциал и возбудимость

##### Потенциал покоя

Подавляющее большинство ионных токов активируется при деполяризации клеточной мембраны относительно равновесного значения, называемого потенциалом покоя. Так, в модели Beeler-Reuter стационарные значения токов $I_{Na}$, $I_{s}$ и $I_K$ при $V_m$=-80 мВ близки к нулю. В силу этого равновесное значение мембранного потенциала определяется, в первую очередь калиевым током внутреннего выпрямления($I_{K1}$). Другими словами,  потенциал покоя является устойчивым положением равновесия, т.к. при небольших возмущениях начальных данных зависимость мембранного потенциала от времени описывается уравнением:

$$
\\begin{equation}\\frac{dV}{dt} \\approx -\\frac{ i_{K1} }{C},\\end{equation}
$$

 где $I_{K1}$ вычисляется из уравнения (33) (Рис. [1А](https://www.notion.so/Beeler-Reuter-4b0bf96f78e74e40889c9fad686d1686), [1Б](https://www.notion.so/Beeler-Reuter-4b0bf96f78e74e40889c9fad686d1686))

##### Пороговый потенциал и потенциал действия

Для возбуждения миоцита необходимо возмущение, превышающее пороговое значение потенциала, которое, в первую очередь, связано с активацией натриевого тока. При таких значениях мембранного потенциала деполяризующие (отрицательные) токи превышают реполяризующие калиевые токи.  Последующий процесс электрического возбуждения называется потенциалом действия. Для желудочковых миоцитов можно выделить следующие фазы потенциала действия: быстрая деполяризация, фаза плато и реполяризация.

В силу высокой амплитуды натриевого тока во время фазы деполяризации (Рис 3.) мембранный потенциал за время порядка нескольких миллисекунд деполяризуется до положительного значения (~ +20 mV) . При таких потенциалах стационарное значение инактивационной воротной переменной ($h$) близко к нулю (Рис 4.). Следствием этого является то, что длительность фазы быстрой деполяризации близка к характерному времени $\\tau_h$. 

Во время фазы плато (Рис 3.) потенциал длительное время удерживается около 0 мВ за счет деполяризующего кальциевого ($Is$) и  реполяризующих калиевых токов. Это обеспечивает б*о*льшую длительность ПД, чем, например, в нейронах и необходимо для электромеханического сопряжения. 

Во время фазы реполяризации инактивируются кальциевые каналы, реполяризующие калиевые токи восстанавливают потенциал покоя.

Ткань сердца представляет собой синцитий, т.е. соседние миоциты взаимодействуют через специальные белки: щелевые контакты. При распространении ПД по ткани сердца  межклеточный ток между возбужденными миоцитами и миоцитами в состоянии покоя меняет потенциал последних выше порогового значения.  В качестве простейшей модели взаимодействующих миоцитов в ткани сердца зачастую используется одноклеточная модель, периодически возбуждаемая током стимуляции.  Электрическое возбуждение при этом достаточно хорошо воспроизводится одноклеточной моделью в силу принципа "Все-или-ничего", показанного на рис. 2: форма потенциала действия слабо зависит от тока стимуляции при амплитуде последнего, достаточного для деполяризации выше порогового значения.

![А.](https://sun9-35.userapi.com/impg/RjA_snynzE9R3dJWXnmMnftTlXwYv0HyHoZCLA/fm5ArM8Kae4.jpg?size=407x262&quality=96&sign=e94df87ffa1fb854e608ba5b495a97a2&type=album)

А.

![Б. 
Рис 1.Варьирование трансмембранного потенциала в начальный момент времени: А - t = [0, 400] мс; Б - t = [0, 20] мс](https://sun9-18.userapi.com/impg/t5SkdI_UGa2SL3R8MJIsUs1Tf9Fp1XWn2gej1w/kM34FzTUlyg.jpg?size=404x262&quality=96&sign=287611d9de15b6ed11eee176f1f8b88b&type=album)

Б. 
Рис 1.Варьирование трансмембранного потенциала в начальный момент времени: А - t = [0, 400] мс; Б - t = [0, 20] мс

![Рис 2. Варьирование амплитуды тока симуляции.](https://sun9-6.userapi.com/impg/KnKaWWhi0kgk6cTsIrTcfdlIN6tpX4U-cxnDtg/n-zbNzJ5www.jpg?size=397x262&quality=96&sign=ec4574f142da3cc8e45b773b7c7b1d07&type=album)

Рис 2. Варьирование амплитуды тока симуляции.

![Рис 3. Потенциал действия и ионные токи](https://sun9-74.userapi.com/impg/Q00TPsNoCEslWw_HliPOME5sajUjzd_Ok5Z1PA/SmzNAZYSkVo.jpg?size=1080x2160&quality=96&sign=1d988ff2a9334ea6b9f6a01f9c427dcc&type=album)

Рис 3. Потенциал действия и ионные токи

![Рис 4. Воротные переменные и характерное время инактивации при разных потенциала](https://sun9-34.userapi.com/impg/TPIePtlWl8I8pzzcEXYpbvG-q4Z66sRFkH-f2Q/_nQGeMpUQ5U.jpg?size=1200x1800&quality=96&sign=de28e4d36666290e1e50b3894553f6dd&type=album)

Рис 4. Воротные переменные и характерное время инактивации при разных потенциала

#### Реституция и рефрактерность

Сокращение длительности потенциала действия (ДПД или APD, Action Potential Duration) при увеличении частоты сердечных сокращений имеет важное физиологическое значение. Сокращение ДПД увеличивает диастолический
интервал, что, в свою очередь, необходимо
для наполнения желудочков и адекватного
сердечного выброса. Этот явление называется реституцией длительности потенциала действия (Рис. 5, 6, 7). Реституция ДПД играет важную роль в аритмогенезе. Например, при большом наклоне кривой реституции, пространственная неоднородность диастолического интервала приводит к значительной неоднородности длительности потенциала действия, что является потенциально аритмогеноопасным фактором.  

Реституция ПД объясняется конечным характерным временем воротных переменных. Значения воротных переменных в момент возбуждения миоцита оказываются частотозависимыми в случае, если диастолический интервал недостаточен для достижения стационарного значения.

Связанным понятием является рефрактерный период: повторное возбуждение миоцита возможно только через некоторый промежуток времени. Как видно на рис 6. повторная активация деполяризующих токов возможна только после реполяризации мембраны и происходит с характерным временем $\\tau_h$, $\\tau_f$. Таким образом, возбуждение миоцитов возможно только с периодом выше некоторого критического значения (Рис 6.).

![Рис 5. Потенциал действия при различных периодах стимуляции. Воротные переменные при различных частотах стимуляции: B -  x1, C -  f, D - d](https://sun9-29.userapi.com/impg/2XjJimWQFCGNdg101bBOUn5BBtXvlBUvXUSYAw/-zILI_i0RXo.jpg?size=456x1120&quality=96&sign=45d681beb5d10e8c0fa71a71ad9ab7f2&type=album)

Рис 5. Потенциал действия при различных периодах стимуляции. Воротные переменные при различных частотах стимуляции: B -  x1, C -  f, D - d

![Рис 6. Длительность потенциала действия зависит от периода стимуляции. Измерена на высоте 80 % реполяризации.](https://sun9-79.userapi.com/impg/IYQjNwCRBNrwNIZIYJOH-to2YuFcBLnmuk_-JQ/vRHlJjsNERM.jpg?size=402x266&quality=96&sign=dfa73167bcbd89a689d01f9eb4b0a150&type=album)

Рис 6. Длительность потенциала действия зависит от периода стимуляции. Измерена на высоте 80 % реполяризации.

### Список литературы

1. O'Hara, Thomas, et al. "Simulation of the undiseased human cardiac
ventricular action potential: model formulation and experimental
validation." *PLoS computational biology* 7.5 (2011): e1002061.
2. Grandi, Eleonora, Francesco S.
Pasqualini, and Donald M. Bers. "A novel computational model of the
human ventricular action potential and Ca transient." *Journal of molecular and cellular cardiology* 48.1 (2010): 112-121.
3. Beeler, Go W., and H. Reuter. "Reconstruction of the action potential of ventricular myocardial fibres." *The Journal of physiology* 268.1 (1977): 177-210.
4. Hodgkin, Alan
L., and Andrew F. Huxley. "A quantitative description of membrane
current and its application to conduction and excitation in nerve." *The Journal of physiology* 117.4 (1952): 500-544.

---

[Coming soon...](https://www.notion.so/Coming-soon-e56432e3fbe64759b5b4b26b655e56b2)
`

const project = [
    {
        name: "HplSolver",
        request: "hpl_solver",
        parameters: [
            {'type': 'number',
                'name': 'C',
                'label': 'C',
                'example': 0.01},
            {'type': 'number',
                'name': 'g_Na',
                'label': 'g_Na',
                'example': 0.04},
            {'type': 'number',
                'name': 'E_Na',
                'label': 'E_Na',
                'example': 50},
            {'type': 'number',
                'name': 'E_K',
                'label': 'E_K',
                'example': 85},
            {'type': 'number',
                'name': 'g_Nac',
                'label': 'g_Nac',
                'example': 3e-05},
            {'type': 'number',
                'name': 'g_s',
                'label': 'g_s',
                'example': 0.0009},
            {'type': 'number',
                'name': 'm_scaler',
                'label': 'm_scaler',
                'example': 1.0},
            {'type': 'number',
                'name': 'IstimStart',
                'label': 'IstimStart',
                'example': 0},
            {'type': 'number',
                'name': 'IstimEnd',
                'label': 'IstimEnd',
                'example': 1e+42},
            {'type': 'number',
                'name': 'IstimAmplitude',
                'label': 'IstimAmplitude',
                'example': 0.1},
            {'type': 'number',
                'name': 'IstimPeriod',
                'label': 'IstimPeriod',
                'example': 1000
            },
            {'type': 'number',
                'name': 'IstimPulseDuration',
                'label': 'IstimPulseDuration',
                'example': 5
            },
            {'type': 'number',
                'name': 'V',
                'label': 'V',
                'example': -85.0},
            {'type': 'number',
                'name': 'h',
                'label': 'h',
                'example': 0.011},
            {'type': 'number',
                'name': 'm',
                'label': 'm',
                'example': 0.998},
            {'type': 'number',
                'name': 'j',
                'label': 'j',
                'example': 0.975},
            {'type': 'number',
                'name': 'Cai',
                'label': 'Cai',
                'example': 0.0001},
            {'type': 'number',
                'name': 'd',
                'label': 'd',
                'example': 0.003},
            {'type': 'number',
                'name': 'f',
                'label': 'f',
                'example': 0.994},
            {'type': 'number',
                'name': 'x1',
                'label': 'x1',
                'example': 0.0001
            },
            {'type': 'number',
                'name': 't_span',
                'label': 't_span',
                'isArray': true,
                'maxAmount': 2,
                'example': [0, 2000]},
            {'type': 'text',
                'name': 'method',
                'label': 'method',
                'example': 'LSODA'},
            {'type': 'number',
                'name': 'max_step',
                'label': 'max_step',
                'example': 0.5},
            {'type': 'text',
                'name': 'model_name',
                'label': 'model_name',
                'example': 'beeler_reuter'
            },
        ],
    },
]



function HplProject() {

    return <ProjectPattern title={title}
                           description={description}
                           project={project}
    />
}

export default HplProject;
