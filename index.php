<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<style>
    body, button{font-size: 12pt;}
    button{cursor:pointer; background-color: #fcfcfc; color: #009900}
    td{min-width: 20px; min-height: 20px; font-size: 14pt; text-align: center}
    .working{color:darkorange}
    .removed {color: red}
    .added {}
    .replaced {background: red; color: #fff}
    .noMoviment {background: burlywood}
</style>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="jquery.js" type="text/javascript"></script>
        <script src="knockout-3.4.2.js" type="text/javascript"></script>
        <script src="knockout.mapping.js" type="text/javascript"></script>
        <script src="knockoutHelper.js" type="text/javascript"></script>
        <script src="jsonhelper/cycle.js" type="text/javascript"></script>
        <script src="Animals.js" type="text/javascript"></script>
        <script src="Enviroment.js" type="text/javascript"></script>

    </head>
    <body>
        <h2>Matrix</h2>
        <button data-bind="click: restart" >Start / Restart</button>
        <button data-bind="click: addAnimals" >Add Animals</button>
        <button data-bind="click: nextIteration" >Next</button>
        <br/>
        <span >
            <span data-bind="foreach:  historic" style="float:left">
                <table border='1' style="display: inline-block">
                    <tbody data-bind="foreach: {data: matrix, as: 'row'}">

                        <tr data-bind="foreach: {data: row, as: 'cell'}">
                            <td data-bind="text:cell.text(),
                            css: cell.status ">

                            </td>
                        </tr>
                    </tbody>
                </table>
            </span>


        </span>



        <div id="main">

        </div>
        <?php
        // put your code here
        ?>
    </body>
</html>

<script src="main.js?<?= rand(1, 32000) ?>" type="text/javascript"></script>