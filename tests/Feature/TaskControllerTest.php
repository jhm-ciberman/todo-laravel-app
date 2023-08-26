<?php

namespace Tests\Feature\Models;

use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index(): void
    {
        $user = User::factory()->create();

        $user->tasks()->createMany(
            Task::factory(10)->make()->toArray()
        );

        $response = $this->actingAs($user)->getJson(route('tasks.index'));

        $response->assertOk();
        $response->assertJsonCount(10, 'data');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'completed_at',
                    'order',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);
    }

    public function test_store(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson(route('tasks.store'), [
            'title' => 'Test Task',
        ]);

        $response->assertCreated()->assertJsonStructure([
            'id',
            'title',
            'completed_at',
            'order',
            'created_at',
            'updated_at',
        ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
        ]);
    }

    public function test_show(): void
    {
        $user = User::factory()->create();

        $task = $user->tasks()->create(
            Task::factory()->make()->toArray()
        );

        $response = $this->actingAs($user)->getJson(route('tasks.show', $task));

        $response->assertOk()->assertJsonStructure([
            'id',
            'title',
            'completed_at',
            'order',
            'created_at',
            'updated_at',
        ]);
    }

    public function test_update_incomplete(): void
    {
        $user = User::factory()->create();

        $task = $user->tasks()->create(
            Task::factory()->make()->toArray()
        );

        $response = $this->actingAs($user)->patchJson(route('tasks.update', $task), [
            'title' => 'Updated Task',
            'completed' => false,
        ]);

        $response->assertOk();

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task',
        ]);
    }

    public function test_update_complete(): void
    {
        $user = User::factory()->create();

        $task = $user->tasks()->create(
            Task::factory()->make()->toArray()
        );

        Carbon::setTestNow(now());

        $response = $this->actingAs($user)->patchJson(route('tasks.update', $task), [
            'title' => 'Updated Task',
            'completed' => true,
        ]);

        $response->assertOk();

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task',
            'completed_at' => now(),
        ]);
    }

    public function test_destroy(): void
    {
        $user = User::factory()->create();

        $task = $user->tasks()->create(
            Task::factory()->make()->toArray()
        );

        $response = $this->actingAs($user)->deleteJson(route('tasks.destroy', $task));

        $response->assertNoContent();

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
        ]);
    }
}
