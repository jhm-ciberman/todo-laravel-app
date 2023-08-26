<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Create the controller instance.
     */
    public function __construct()
    {
        $this->authorizeResource(Task::class, 'task');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'data' => $request->user()->tasks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Task
    {
        $validated = $request->validate([
            'title' => ['required', 'string'],
        ]);

        return $request->user()->tasks()->create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): Task
    {
        return $task;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task): Task
    {
        $request->validate([
            'title' => ['required', 'string'],
            'completed' => ['required', 'boolean'],
        ]);

        $task->fill([
            'title' => $request->input('title'),
            'completed_at' => $request->input('completed') ? now() : null,
        ])->save();

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): Response
    {
        $task->delete();

        return response()->noContent();
    }
}
