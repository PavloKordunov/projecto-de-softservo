package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.SearchDto;
import com.proj.forum.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

@Logging
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/{name}")
    public ApiResponse<SearchDto> getByName(@PathVariable String name) {
        SearchDto searchDto = searchService.findByName(name);
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", searchDto);
    }
}
