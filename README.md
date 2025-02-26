### Github status:
[![nodejs](https://github.com/orc-code/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/orc-code/frontend-project-46/actions/workflows/nodejs.yml)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/orc-code/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/orc-code/frontend-project-46/actions)

### CodeCLimate maintainability and test coverage:
[![Maintainability](https://api.codeclimate.com/v1/badges/4bbdf1a4e3ca1067b590/maintainability)](https://codeclimate.com/github/orc-code/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4bbdf1a4e3ca1067b590/test_coverage)](https://codeclimate.com/github/orc-code/frontend-project-46/test_coverage)

#### Установка

1. Клонируем [репозиторий](https://github.com/orc-code/frontend-project-46.git)
```properties
git clone https://github.com/orc-code/frontend-project-46.git
```
2. Переходим в директорию проекта
```properties
cd frontend-project-46/
```
3. Устанавливаем зависимости
```properties
make install
```
4. Устанавливаем пакет приложения
```properties
make addPackage
```

### Вызов справки
``` properties
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Arguments:
  filepath1            path to first file, supported formats: json, yaml, yml
  filepath2            path to second file, supported formats: json, yaml, yml

Options:
  -V, --version        output the version number
  -f, --format [type]  output format, supported formats: plain, json, stylish (default: "stylish")
  -h, --help           display help for command
  ```

  ### Примеры использования
* плоская структура, формат stylish
```properties
gendiff __fixtures__/file1.json __fixtures__/file2.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

* плоская структура, формат plain
```properties
gendiff __fixtures__/file1.json __fixtures__/file2.json -f plain
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```
* плоская структура, формат json
```properties
gendiff __fixtures__/file1.yaml __fixtures__/file2.yml -f json
[
  {
    "type": "removed",
    "key": "follow",
    "value": false,
    "depth": 1
  },
  {
    "type": "default",
    "key": "host",
    "value": "hexlet.io",
    "depth": 1
  },
  {
    "type": "removed",
    "key": "proxy",
    "value": "123.234.53.22",
    "depth": 1
  },
  {
    "type": "updated",
    "key": "timeout",
    "values": [
      {
        "type": "removed",
        "key": "timeout",
        "value": 50,
        "depth": 1
      },
      {
        "type": "added",
        "key": "timeout",
        "value": 20,
        "depth": 1
      }
    ]
  },
  {
    "type": "added",
    "key": "verbose",
    "value": true,
    "depth": 1
  }
]
```

* вложенные структуры, формат stylish
```properties
gendiff __fixtures__/file1-nested.json __fixtures__/file2-nested.json 
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

* вложенные структуры, формат plain
```properties
gendiff __fixtures__/file1-nested.json __fixtures__/file2-nested.json -f plain
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

* вложенные структуры, формат json
```properties
gendiff __fixtures__/file1-nested.json __fixtures__/file2-nested.json -f json
[{"type":"nested","key":"common","value":[{"type":"added","key":"follow","value":false},{"type":"unchanged","key":"setting1","value":"Value 1"},{"type":"removed","key":"setting2","value":200},{"type":"updated","key":"setting3","value":[true,null]},{"type":"added","key":"setting4","value":"blah blah"},{"type":"added","key":"setting5","value":{"key5":"value5"}},{"type":"nested","key":"setting6","value":[{"type":"nested","key":"doge","value":[{"type":"updated","key":"wow","value":["","so much"]}]},{"type":"unchanged","key":"key","value":"value"},{"type":"added","key":"ops","value":"vops"}]}]},{"type":"nested","key":"group1","value":[{"type":"updated","key":"baz","value":["bas","bars"]},{"type":"unchanged","key":"foo","value":"bar"},{"type":"updated","key":"nest","value":[{"key":"value"},"str"]}]},{"type":"removed","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"added","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]
```
