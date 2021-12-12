import React from 'react';
import ProjectPattern from "../ProjectPattern";

const title = `### Решатель систем ОДУ методом CROS`

const description = `

Здесь представлена система для решения жестких систем ОДУ комплексным одностадийным методом Розенброка.

Для системы ОДУ

$\\begin{aligned}
\t&\\frac{d y}{d t}=\\boldsymbol{f}(\\boldsymbol{y}) \\\\
\t&\\boldsymbol{y}(0)=\\boldsymbol{g}
\\end{aligned}$

Суть метода можно коротко представить следующими формулами:

$\\begin{aligned}
\t\\boldsymbol{y}_{1}=\\boldsymbol{y}_{0}+\\tau \\operatorname{Re}(\\boldsymbol{w}) \\\\
\\left(\\boldsymbol{E}-\\frac{1+i}{2} \\tau J\\right) \\boldsymbol{w}=\\boldsymbol{f}\\left(t_{n}+\\frac{\\tau}{2}, \\boldsymbol{y}_{0}\\right)
\\end{aligned}$

, где J - матрица Якоби. Метод обладает вторым порядком аппроксимации.

Приближённое обращение матрицы на каждом шаге реализовано методом Шульца, который состоит в следующем:

$\\begin{aligned}
\t\\newline&\\mathbf{R}_{m}=\\mathbf{E}-\\mathbf{B}_{m} \\mathbf{W} \\\\
\t&\\mathbf{B}_{m+1}=\\left(\\mathbf{E}+\\mathbf{R}_{m}+\\mathbf{R}_{m}{ }^{2}+\\ldots+\\mathbf{R}_{m}{ }^{k}\\right) \\mathbf{B}_{m}
\\end{aligned}$

, где W - исходная матрица, R - остаток, B - приближение обратной матрицы.

Использование данного метода позволяет ускорить вычисления за счет распараллеливания операции умножения матриц.

Таким образом, ниже представлен решатель систем ОДУ (записывать в **Python**-синтаксисе) с заданными начальными условиями (вектор начальных значений переменных), с заданным числом шагов и размером шага. Имеется возможность назвать каждую переменную для удобства (имена по порядку столбца **f**).

`

// const fileUrl = "https://drive.google.com/file/d/13BVdsdInmnEsBgy1-qBj0IUx3hWBkbnd/view"
const fileUrl = "https://psv4.userapi.com/c237331/u103159559/docs/d24/9d75e6c85d62/CrosSolver.pdf?extra=vhOYkYPdCKa-tdC_F1ox1CqCIxsP-jRWyYNWTQDvuDjTNFiFCOoMrLl8FuW7oAUxjuMmWOXl5TJr1ifP8z9CjFCI3xZG5U87OwPh0vVdwGBbg8LykiKRDWcuNBuM-ufstPnXV8JwX-6XMwi4pm9ljcyHHw"

const project = [
    {
        name: "Cros",
        request: "cros_solver",
        parameters: [
            {
                type: 'number',
                name: 't',
                label: 'Время работы алгоритма',
                example: 0.8,
            },
            {
                type: 'number',
                name: 'steps_amount',
                label: 'Количество шагов алгоритма',
                example: 1200,
            },
            {
                type: 'text',
                name: 'names',
                label: 'Название переменной',
                isArray: 1,
                maxAmount: -1,
                example: ["O2", "X1", "Y1", "ZZ12", "SMTHelse"],
            },
            {
                type: 'number',
                name: 'init_values',
                label: 'Начальное значение',
                isArray: 1,
                maxAmount: -1,
                example: [0.31, 34.9, 53.7, 1.2, 65.2],
            },
            {
                type: 'text',
                name: 'equations',
                label: 'Уравнение',
                isArray: 1,
                maxAmount: -1,
                example: [
                    "f0 = 100500*y2/y3-y4",
                    "f1 = 12*(y3-y1)/(y2+y4)**3",
                    "f2 = (y2+y4)*(y1+y2)/y1**3",
                    "f3 = 12*(y3-y1)/(y2+y3)**3",
                    "f4 = (y0-y1+y2)/(y3+y4)",
                ],
            },
        ]
    },
]



function CrosSolverProject() {

    return <ProjectPattern title={title}
                           description={description}
                           project={project}
                           fileUrl={fileUrl}
    />
}

export default CrosSolverProject;
