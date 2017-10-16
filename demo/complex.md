**Inking and Brushing technique with Vega-Lite charts**
~~~~
```vega-lite
data:
  url: cars.json

vconcat:
  - mark: point
    selection:
      brush:
        type: interval
    encoding:
      x:
        field: Horsepower
        type: quantitative
      y:
        field: Miles_per_Gallon
        type: quantitative

  - mark: point
    transform:
      - filter:
          selection: brush
    encoding:
      x:
        field: Acceleration
        type: quantitative
        scale:
          domain:
            - 0
            - 25
      y:
        field: Displacement
        type: quantitative
        scale:
          domain:
            - 0
            - 500
```
~~~~

*Click & Drag to select region*
```vega-lite
data:
  url: cars.json

vconcat:
  - mark: point
    selection:
      brush:
        type: interval
    encoding:
      x:
        field: Horsepower
        type: quantitative
      y:
        field: Miles_per_Gallon
        type: quantitative

  - mark: point
    transform:
      - filter:
          selection: brush
    encoding:
      x:
        field: Acceleration
        type: quantitative
        scale:
          domain:
            - 0
            - 25
      y:
        field: Displacement
        type: quantitative
        scale:
          domain:
            - 0
            - 500
```
