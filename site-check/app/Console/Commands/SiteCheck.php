<?php

namespace App\Console\Commands;

use App\Jobs\CheckSiteAvailabilityJob;
use App\Models\Site;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class SiteCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:site-check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sites = Site::all();

        foreach ($sites as $site) {
            CheckSiteAvailabilityJob::dispatch($site);
        }

        $this->info('Site availability checks have been dispatched.');
    }
}
