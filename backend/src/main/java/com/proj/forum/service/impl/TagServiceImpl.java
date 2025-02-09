package com.proj.forum.service.impl;

import com.proj.forum.dto.TagDto;
import com.proj.forum.entity.Tag;
import com.proj.forum.repository.TagRepository;
import com.proj.forum.service.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@Transactional
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public UUID createTag(TagDto tagDto) {
        Tag tag = mapToTag(tagDto);
        Tag tagFromDB = tagRepository.save(tag);
        return tagFromDB.getId();
    }

    @Override
    public TagDto getTag(UUID id) {
        Optional<Tag> tag;
        tag = tagRepository.findById(id);
        if (tag.isEmpty()) {
            throw new EntityNotFoundException("No tag");
        }


        return TagDto.builder()
                .id(id)
                .name(tag.get().getName())
                .build();
    }

    @Override
    public List<TagDto> getAllTags() {
        List<Tag> tagList;
        tagList = tagRepository.findAll();
        if (tagList.isEmpty()) {
            throw new EntityNotFoundException("No tags");
        }

        return tagList.stream()
                .map(TagServiceImpl::getUpdateTag)
                .toList();
    }

    private static Tag mapToTag(TagDto tagDto) {
        return Tag.builder()
                .name(tagDto.name())
                .build();
    }

    private static TagDto getUpdateTag(Tag tag) {
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }

}
