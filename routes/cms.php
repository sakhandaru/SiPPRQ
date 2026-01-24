<?php

Route::prefix('cms')
    ->as('cms.')
    ->middleware(['web'])
    ->group(function () {
        // Dashboard 

        // Post / Article
        Route::view(
            'upload/tinymce-config',
            'cms.upload.tinymce-config'
        )->name('cms.tinymce.test');
    });