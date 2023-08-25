<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Todo List') }}</title>

    @vite(['resources/js/main.js', 'resources/css/main.css'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
