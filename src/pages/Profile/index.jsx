import React from 'react';
import Content from "../../components/Content";
import styles from "./styles.module.scss";
import ReactMarkdown from 'react-markdown'

const markdown = "# Спецификация от 1 Ноября\n" +
    "\n" +
    "![Specification_nov_7.drawio.png](%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BE%D1%82%201%20%D0%9D%D0%BE%D1%8F%D0%B1%D1%80%D1%8F%20242c1d9f52dd4551badb4c48236c3c15/Specification_nov_7.drawio.png)\n" +
    "\n" +
    "Картинка нарисована в [draw.io](https://app.diagrams.net/).\n" +
    "\n" +
    "[Specification_nov_7.xml](%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BE%D1%82%201%20%D0%9D%D0%BE%D1%8F%D0%B1%D1%80%D1%8F%20242c1d9f52dd4551badb4c48236c3c15/Specification_nov_7.xml)\n" +
    "\n" +
    "# Frontend\n" +
    "\n" +
    "(ответственный @Денис Андреевич Митрошин )\n" +
    "\n" +
    "Что **пользователь** может делать\n" +
    "\n" +
    "**По сути дела:**\n" +
    "\n" +
    "- Читать\n" +
    "    - чем занимается область\n" +
    "    - какие задачи можно решать\n" +
    "    - что значат результаты\n" +
    "- Исследовать решения типовых задач\n" +
    "    - рисовать и крутить графики\n" +
    "- Решать те же задачи со своими хотелками\n" +
    "    - менять параметры по-умолчанию\n" +
    "    - определять, что нарисовать\n" +
    "    - запускать решение задачи\n" +
    "\n" +
    "**А также:**\n" +
    "\n" +
    "- Авторизироваться\n" +
    "- Пользоваться историей операций\n" +
    "(восстанавливать старые задачи, перерешивать их)\n" +
    "\n" +
    "---\n" +
    "\n" +
    "Для рисования графиков можно использовать:\n" +
    "\n" +
    "- [https://plotly.com/javascript/](https://plotly.com/javascript/)\n" +
    "- [https://d3js.org/](https://d3js.org/)\n" +
    "- что угодно, на самом деле\n" +
    "\n" +
    "# Backend-conductor (python)\n" +
    "\n" +
    "[GitHub - MIPT-Virtual-Labs/backend-conductor](https://github.com/MIPT-Virtual-Labs/backend-conductor)\n" +
    "\n" +
    "(ответственный @Andrey Pikunov)\n" +
    "\n" +
    "- Принимает HTTP запросы от **Frontend**-а\n" +
    "- Достаёт json из запроса\n" +
    "- Передаёт json **Солверам**\n" +
    "- Получает от них готовые данные, которые будет рисовать **Frontend**\n" +
    "\n" +
    "# Solvers\n" +
    "\n" +
    "(ответственные все, кто решает задачи)\n" +
    "\n" +
    "Содержат \"entry points\", которые выглядят так:\n" +
    "\n" +
    "```python\n" +
    "def handle_request(request_json: dict):\n" +
    "    # do something ...\n" +
    "\t\treturn response  # тоже dict\n" +
    "```\n" +
    "\n" +
    "**WARNING:** формат может измениться, но суть вряд ли\n" +
    "\n" +
    "Задача на эту тему:\n" +
    "\n" +
    "[Описать поля json-ов на вход и выход солверов](https://www.notion.so/json-e8f5730d2e184666bf780114f35b6f79) \n" +
    "\n" +
    "пример: [solver_dummy.handle_request](https://github.com/MIPT-Virtual-Labs/solver-dummy/blob/master/solver_dummy/handle_request.py).\n" +
    "\n" +
    "---\n" +
    "\n" +
    "**Солверы**:\n" +
    "\n" +
    "- Проверяют входные данные и, если нужно, приводят их к правильному виду\n" +
    "    - **Если этого сделать НЕВОЗМОЖНО**, то возвращать json в формате\n" +
    "        \n" +
    "        ```json\n" +
    "        {\n" +
    "        \t'status': 'error',\n" +
    "        \t'errors': [\n" +
    "        \t\t{\n" +
    "        \t\t\t'error': '<error description>', \n" +
    "        \t\t\t'field': '<field name>', \n" +
    "        \t\t}, \n" +
    "        \t\t...\n" +
    "        \t]\n" +
    "        }\n" +
    "        ```\n" +
    "        \n" +
    "        - Описание ошибки может выдаваться пользователю для каждого вводного параметра (**примечание**: так и должно быть в идеале, например, функция принимает какие-то числовые аргументы или массив значений). \n" +
    "        **НАПРИМЕР**, передается число N, для которого вычисляется факториал, то в случае передачи *{'N': 'smth'}*, функция логично должна возвращать\n" +
    "        \n" +
    "        ```json\n" +
    "        {\n" +
    "            'status': 'error', \n" +
    "            'errors': [\n" +
    "                {\n" +
    "                    'error': 'Должно быть числом', \n" +
    "                    'field': 'N',\n" +
    "                },\n" +
    "            ]\n" +
    "        }\n" +
    "        ```\n" +
    "        \n" +
    "        - **ПРИМЕЧАНИЕ #1**: Функция факториала приведена для примера. Конечно, на фронте можно проверять, число это или нет, однако формат данных часто бывает неочевидным и не целесообразно прописывать все такие проверки формата на сайте (тем более с учетом того, что обработка запроса со временем может поменяться и какие-то ошибки станет возможно корректировать).\n" +
    "- Решают задачу:\n" +
    "    - считают сами (на питоне, соответственно)\n" +
    "    - [subprocess](https://docs.python.org/3/library/subprocess.html), который запускает исполняемый файл\n" +
    "    (предпочтительный вариант\n" +
    "    пример: [solver_dummy.factorial](https://github.com/MIPT-Virtual-Labs/solver-dummy/blob/master/solver_dummy/factorial.py))\n" +
    "    - используют API\n" +
    "    (наименее предпочтительный вариант, потому что может работать медленно. но это сначала нужно замерить)\n" +
    "    - **Если во время выполнения программы ПРОИЗОШЛА ОШИБКА**, то ответ должен быть в виде:\n" +
    "        \n" +
    "        ```json\n" +
    "        {\n" +
    "            'status': 'failed', \n" +
    "            'description': '<description (why failed)>',\n" +
    "        }\n" +
    "        ```\n" +
    "        \n" +
    "        - Например,\n" +
    "        \n" +
    "        ```json\n" +
    "        {\n" +
    "            'status': 'failed', \n" +
    "            'description': 'Division by zero',\n" +
    "        }\n" +
    "        ```\n" +
    "        \n" +
    "        - Но желательно, конечно, чуть подробнее, чем в этом примере:)\n" +
    "    - **ЕСЛИ РЕШАЕТ ЗАДАЧУ ДОЛГО**:\n" +
    "    Задача не обязана считаться быстро. **Если так и происходит в вашем случае**, то существует риск поймать *408 Request Timeout («истекло время ожидания»)* после отправки задачи на выполнение. В таком случае, необходимо иметь возможность отправить пользователю token процесса, отвечающего за выполнение данной задачи, чтобы пользователь мог периодически слать запросы о проверке состояния выполнения, а саму задачу выполнять в фоновом режиме.\n" +
    "    В таком случае необходимо возвращать json о состоянии задачи (вероятно, эта функция отлична от функции запуска задачи), например:\n" +
    "    \n" +
    "    ```json\n" +
    "    {\n" +
    "    \t'status': 'process',\n" +
    "    \t'token': '<process token, f.e. GEfgd342gf54wsws29GFsdpxqgdgw2pzsdDS42gf>'\n" +
    "    \t'information': {\n" +
    "    \t\t'percent': <number from 0 to 100 of total progress>,\n" +
    "    \t\t'task': {\n" +
    "    \t\t\t'information': '<current task description>',\n" +
    "    \t\t\t'percent': <number from 0 to 100 of task progress>,\n" +
    "    \t\t},\n" +
    "    \t},\n" +
    "    }\n" +
    "    ```\n" +
    "    \n" +
    "- Собирают результаты\n" +
    "- Подготавливают выходные данные для рисования\n" +
    "- Возвращают эти данные обратно Backend-conductor\n" +
    "    - В случае если программа **ЗАВЕРШИЛАСЬ С ОШИБКОЙ**, [смотри информацию выше]()\n" +
    "    - Если отработала корректно, тогда необходимо вернуть json в виде:\n" +
    "        \n" +
    "        ```json\n" +
    "        {\n" +
    "        \t'status': 'done',\n" +
    "        \t'type': '<type name>',\n" +
    "        \t'data': {\n" +
    "        \t\t...data,\n" +
    "        \t},\n" +
    "        }\n" +
    "        ```\n" +
    "        \n" +
    "    - Теперь рассмотрим разные варианты того, какие `type` и `data` могут быть\n" +
    "        - 1. Возвращается простой график зависимости по типу $f(x) = y$ или несколько зависимостей $f(x)$. Если зависимость одна, то массив `'y': [...]` содержит один элемент, в случае с несколькими будет, очевидно, несколько элементов:\n" +
    "        \n" +
    "        ```json\n" +
    "        {\n" +
    "        \t'status': 'done',\n" +
    "        \t'type': 'graph',\n" +
    "        \t'graph_scale': 'linear/log/exp',\n" +
    "        \t'data': {\n" +
    "        \t\t'x': {\n" +
    "        \t\t\t'name': '<name of x-axis>',\n" +
    "        \t\t\t'points': [\n" +
    "        \t\t\t\t{\n" +
    "        \t\t\t\t\t'p': <point number, f.e. -60>,\n" +
    "        \t\t\t\t\t\t...<other parameters if necessary [color, line, etc]>\n" +
    "        \t\t\t\t},\n" +
    "        \t\t\t\t...\n" +
    "        \t\t\t]\n" +
    "        \t\t},\n" +
    "        \t\t'y': [\n" +
    "        \t\t\t{\n" +
    "        \t\t\t\t...<the same as structure for 'x'>\n" +
    "        \t\t\t},\n" +
    "        \t\t\t...\n" +
    "        \t\t],\n" +
    "        \t},\n" +
    "        }\n" +
    "        ```\n" +
    "        \n" +
    "        - 2. Что-то еще? Пишите в группу в ТГ, обсудим\n" +
    "\n" +
    "Простейший пример такого солвера:\n" +
    "\n" +
    "[GitHub - MIPT-Virtual-Labs/solver-dummy](https://github.com/MIPT-Virtual-Labs/solver-dummy)\n" +
    "\n" +
    "# Database\n" +
    "\n" +
    "Здесь, в первую очередь, нужны пояснения от @Денис Андреевич Митрошин.\n" +
    "\n" +
    "Что обязательно хранить в БД \n" +
    "\n" +
    "- User info: username, password hash, first_name, last_name\n" +
    "- User's tokens for authorization\n" +
    "- Logs about activities\n" +
    "- В идеале связку пользователя с токеном процесса, чтобы никто не смог получить доступ к чужому процессу (если это требуется)"



function Profile() {

    return <div className={styles.mainDiv}>
        <h1>Профиль</h1>
        <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
}

export default Profile;
