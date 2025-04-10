package com.proj.forum.strategy;

import com.proj.forum.dto.TagDto;
import com.proj.forum.entity.Tag;
import com.proj.forum.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TagCustomMapper implements CustomMapper<Tag, TagDto> {
    private final TagRepository tagRepository;

    @Override
    public Tag mapToEntity(TagDto tagDto) {
        return Tag.builder()
                .name(tagDto.name())
                .build();
    }

    @Override
    public TagDto mapToDto(Tag tag) {
        int countPosts = tagRepository.countPostsByTagId(tag.getId());

        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .countPosts(countPosts)
                .build();
    }
}
