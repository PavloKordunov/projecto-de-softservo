package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.SearchDto;
import com.proj.forum.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@CrossOrigin("http://localhost:3000")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/{name}")
    public ApiResponse<SearchDto> getByName(@PathVariable String name) {
        SearchDto searchDto = searchService.findByName(name);

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", searchDto);
    }
}
